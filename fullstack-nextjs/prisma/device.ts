import prisma from './prisma'

export const getAllDevices = async () => {
  const devices = await prisma.device.findMany({})
  return devices
}

export const getDevice = async (serialNumber: string ) => {
  const device = await prisma.device.findUnique({
    where: { serialNumber }
  })
  return device
}

export const createDevice = async (serialNumber: string) => {
  const device = await prisma.device.create({
    data: {
      serialNumber
    }
  })
  return device
}

export const updateDevice = async (id: string, updateData: any) => {
  const device = await prisma.device.update({
    where: {
      id
    },
    data: {
      ...updateData
    }
  })
  return device
}

export const deleteDevice = async (id: string) => {
  const device = await prisma.device.delete({
    where: {
      id
    }
  })
  return device
}
