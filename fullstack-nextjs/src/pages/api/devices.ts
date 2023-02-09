import { NextApiRequest, NextApiResponse } from 'next'
import {
  createDevice,
  deleteDevice,
  getAllDevices,
  getDevice,
  updateDevice
} from '../../../prisma/device'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET': {
        const deviceId = req.query.id as string;
        if (deviceId) {
          // Get a single device if id is provided is the query
          // api/devices?id=1
          const device = await getDevice(deviceId)
          return res.status(200).json(device)
        } else {
          // Otherwise, fetch all devices
          const devices = await getAllDevices()
          return res.json(devices)
        }
      }
      case 'POST': {
        // Create a new device
        const { serialNumber } = req.body
        const device = await createDevice(serialNumber)
        return res.json(device)
      }
      case 'PUT': {
        // Update an existing device
        const { id, ...updateData } = req.body
        const device = await updateDevice(id, updateData)
        return res.json(device)
      }
      case 'DELETE': {
        // Delete an existing device
        const { id } = req.body
        const device = await deleteDevice(id)
        return res.json(device)
      }
      default:
        break
    }
  } catch (error: any) {
    return res.status(500).json({ ...error, message: error.message })
  }
}