import prisma from './prisma'

export const getAllMeasurements = async () => {
  const measurements = await prisma.measurement.findMany({})
  return measurements
}

export const getMeasurement = async (id: string ) => {
  const measurement = await prisma.measurement.findUnique({
    where: { id }
  })
  return measurement
}

export const createMeasurement = async (
      deviceId: string,
      typeId: string,
      lat: number,
      long: number,
      value: string) => {
  const measurement = await prisma.measurement.create({
    data: {
      deviceId,
      typeId,
      lat,
      long,
      value
    }
  })
  return measurement
}

export const updateMeasurement = async (id: string, updateData: any) => {
  const measurement = await prisma.measurement.update({
    where: {
      id
    },
    data: {
      ...updateData
    }
  })
  return measurement
}

export const deleteMeasurement = async (id: string) => {
  const measurement = await prisma.measurement.delete({
    where: {
      id
    }
  })
  return measurement
}