import prisma from './prisma'

export const getAllMeasurementTypes = async () => {
  const measurementTypes = await prisma.measurementType.findMany({})
  return measurementTypes
}

export const getMeasurementType = async (id: string ) => {
  const measurementType = await prisma.measurementType.findUnique({
    where: { id }
  })
  return measurementType
}

export const createMeasurementType = async (name: string, metric: string) => {
  const measurementType = await prisma.measurementType.create({
    data: {
      name,
      metric
    }
  })
  return measurementType
}

export const updateMeasurementType = async (id: string, updateData: any) => {
  const measurementType = await prisma.measurementType.update({
    where: {
      id
    },
    data: {
      ...updateData
    }
  })
  return measurementType
}

export const deleteMeasurementType = async (id: string) => {
  const measurementType = await prisma.measurementType.delete({
    where: {
      id
    }
  })
  return measurementType
}