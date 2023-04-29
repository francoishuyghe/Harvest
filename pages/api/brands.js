import { db } from '../../firebaseConfig';
import { collection, doc, getDocs, addDoc, deleteDoc } from '@firebase/firestore';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async (req,res) => {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' })
    return
  }
  
  const brandsCol = collection(db, 'brands')
  const brandsnapshot = await getDocs(brandsCol)
  const brandList = brandsnapshot.docs.map(doc => {
    return {id: doc.id, data: doc.data()}
  })
  
  res.status(200).json(brandList)

}