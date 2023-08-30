import { NextApiRequest, NextApiResponse } from 'next'
import {
  createMeasurement,
  deleteMeasurement,
  getAllMeasurements,
  getMeasurement,
  updateMeasurement
} from '../../../prisma/measurement'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET': {
        const measurementId = req.query.id as string;
        if (measurementId) {
          // Get a single measurement if id is provided is the query
          // api/measurements?id=1
          const measurement = await getMeasurement(measurementId)
          return res.status(200).json(measurement)
        } else {
          // Otherwise, fetch all measurements
          const measurements = await getAllMeasurements()
          return res.json(measurements)
        }
      }
      case 'POST': {
        // Create a new measurement
        const { deviceId,
            typeId,
            lat,
            long,
            value } = req.body
        const measurement = await createMeasurement(deviceId,
            typeId,
            lat,
            long,
            value)
        return res.json(measurement)
      }
      case 'PUT': {
        // Update an existing measurement
        const { id, ...updateData } = req.body
        const measurement = await updateMeasurement(id, updateData)
        return res.json(measurement)
      }
      case 'DELETE': {
        // Delete an existing measurement
        const { id } = req.body
        const measurement = await deleteMeasurement(id)
        return res.json(measurement)
      }
      default:
        break
    }
  } catch (error: any) {
    return res.status(500).json({ ...error, message: error.message })
  }
}
