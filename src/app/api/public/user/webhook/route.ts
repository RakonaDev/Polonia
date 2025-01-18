import { Webhook, WebhookVerificationError } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { addDoc, deleteDoc, doc, FirestoreError, getDocs, query, where } from 'firebase/firestore'
import { PoloniaDB } from '@/backend/firebase'
import { userCollection } from '@/backend/collections/user.collection'

const SIGNING_SECRET = process.env.SIGNING_SECRET

export async function POST(req: NextRequest) {
  
  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  let evt: WebhookEvent

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  try {
    const body = await req.json()
    const payload = JSON.stringify(body)
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
    console.log(body.type)

    // USUARIO BORRADO
    if(evt.type === 'user.deleted') {
      console.log(body)

      // Buscar el documento donde el campo "id" coincida
      const q = query(userCollection, where("id", "==", body.data.id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
          console.log("No se encontró un documento con ese ID.");
          return NextResponse.json({ message: "No se encontró un documento con ese ID." });
      }

      // Recorrer resultados y eliminar el documento
      querySnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(doc(PoloniaDB, "users", docSnapshot.id)); // Eliminar por document ID
          console.log(`Documento con el campo 'id' = ${docSnapshot.id} eliminado.`);
      });
      return NextResponse.json({ message: 'Usuario borrado', status: 200 })
    }
    // USUARIO CREADO
    else if (evt.type === 'user.created') {
      const { id, username, email_addresses, first_name } = body.data
      const { email_address } = email_addresses[0]
      const creadedAt = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      
      await addDoc(userCollection, {
        id,
        username: username || first_name,
        email_address,
        creadedAt,
        updatedAt: creadedAt,
      })
      return NextResponse.json({ message: 'Usuario creado', status: 200 })
    }

    return new Response('Webhook received', { status: 200 })
  }
  catch (err) {
    if (err instanceof FirestoreError) {
      console.error(err.message)
      return NextResponse.json({ message: err.message }, { status: 400 })
    }
    else if (err instanceof WebhookVerificationError) {
      return NextResponse.json({ message: err.message, status: 400 })
    }
    return NextResponse.json({ message: err, status: 400 })
  }

}