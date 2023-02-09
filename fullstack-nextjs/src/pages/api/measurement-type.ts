import { NextApiRequest, NextApiResponse } from 'next'
import {
  createMeasurementType,
  deleteMeasurementType,
  getAllMeasurementTypes,
  getMeasurementType,
  updateMeasurementType
} from '../../../prisma/measurementType'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET': {
        const measurementTypeId = req.query.id as string;
        if (measurementTypeId) {
          // Get a single measurementType if id is provided is the query
          // api/measurementTypes?id=1
          const measurementType = await getMeasurementType(measurementTypeId)
          return res.status(200).json(measurementType)
        } else {
          // Otherwise, fetch all measurementTypes
          const measurementTypes = await getAllMeasurementTypes()
          return res.json(measurementTypes)
        }
      }
      case 'POST': {
        // Create a new measurementType
        const { name, metric } = req.body
        const measurementType = await createMeasurementType(name, metric)
        return res.json(measurementType)
      }
      case 'PUT': {
        // Update an existing measurementType
        const { id, ...updateData } = req.body
        const measurementType = await updateMeasurementType(id, updateData)
        return res.json(measurementType)
      }
      case 'DELETE': {
        // Delete an existing measurementType
        const { id } = req.body
        const measurementType = await deleteMeasurementType(id)
        return res.json(measurementType)
      }
      default:
        break
    }
  } catch (error: any) {
    return res.status(500).json({ ...error, message: error.message })
  }
}