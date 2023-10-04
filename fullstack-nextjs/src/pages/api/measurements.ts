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
         
        // Create a new measurement
    
        const { deviceid,
            typeid,
            lat,
            long,
            value } = req.query
        if (!value) {
          const measurements = await getAllMeasurements();
          return res.json(measurements)
        } else
        {
          const measurement = await createMeasurement(deviceid as string,
            typeid as string,
            lat as string,
            long as string,
            value as string)
          return res.json(measurement)
        }
        
        
        
       
        
        
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
