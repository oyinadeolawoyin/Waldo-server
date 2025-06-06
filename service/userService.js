const prisma = require("../config/prismaClient");

async function createUser(username) {
    return await prisma.user.create({
        data: {
            username: username
        }
    });
}

async function deleteRecords(id) {
    return await prisma.game.deleteMany({
      where: {
        userId: id
      }
    });
  }
  

  async function gameRecord(record, userId) {
    await deleteRecords(userId);
  
    return await prisma.game.create({
      data: {
        record: record,
        user: {
          connect: { id: userId }
        }
      },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });
}
  

async function fetchGameRecord() {
    return await prisma.game.findMany({
      orderBy: {
        record: 'asc' 
      },
    });
}
  


module.exports = {
    createUser,
    gameRecord,
    fetchGameRecord
}