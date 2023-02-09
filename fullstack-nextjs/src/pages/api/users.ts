import { NextApiRequest, NextApiResponse } from 'next'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser
} from '../../../prisma/user'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET': {
        const userId = req.query.id as string;
        if (userId) {
          // Get a single user if id is provided is the query
          // api/users?id=1
          const user = await getUser(userId)
          return res.status(200).json(user)
        } else {
          // Otherwise, fetch all users
          const users = await getAllUsers()
          return res.json(users)
        }
      }
      case 'POST': {
        // Create a new user
        const { name, isAdmin } = req.body
        const user = await createUser(name, isAdmin)
        return res.json(user)
      }
      case 'PUT': {
        // Update an existing user
        const { id, ...updateData } = req.body
        const user = await updateUser(id, updateData)
        return res.json(user)
      }
      case 'DELETE': {
        // Delete an existing user
        const { id } = req.body
        const user = await deleteUser(id)
        return res.json(user)
      }
      default:
        break
    }
  } catch (error: any) {
    return res.status(500).json({ ...error, message: error.message })
  }
}