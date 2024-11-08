const { prisma } = require("../prisma/prisma-client");

const UserController = {
  register: async (req, res) => {
    const { name, group, company } = req.body;
    let { presence } = req.body;

    console.log(name, group, company, presence);

    if (presence === true) {
      presence = true;
    } else if (presence === false) {
      presence = false;
    } else {
      return res.status(400).json({ error: "Ошибка с данными" });
    }

    if (!name || !group || !company) {
      return res.status(400).json({ error: "Все поля обязательны" });
    }

    try {
      const user = await prisma.user.create({
        data: {
          name,
          group,
          company,
          presence,
          updatedAt: new Date(),
        },
      });

      res.json(user);
    } catch (error) {
      console.error("Ошибка:", error);
      res.status(500).json({ error: "Ошибка" });
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Что-то пошло не так" });
    }
  },

  current: async (req, res) => {
    
    try {
      const user = await prisma.user.findMany();

      if (!user) {
        return res.status(400).json({ error: "Не удалось найти пользователя" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log("Ошибка:", error);
      res.status(500).json({ error: "Что-то пошло не так" });
    }
  },
  
  updateUser: async (req, res) => {

    const { id } = req.params;
    const { name, group, company } = req.body;
    let { presence } = req.body;
    console.log(name, group, company, presence);

    const updatedPresence = presence !== undefined ? presence : true;
    console.log(updatedPresence);
    try {
      const user = await prisma.user.update({
        where: { id },
        data: {
          name: name || undefined,
          group: group || undefined,
          company: company || undefined,
          presence: updatedPresence,
        },
      });
      res.json(user);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Что-то пошло не так" });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      await prisma.user.delete({
        where: { id },
      });
      res.json({ message: "Пользователь успешно удалён" });
    } catch (error) {
      console.log("Ошибка при удалении пользователя:", error);
      res.status(500).json({ error: "Что-то пошло не так" });
    }
  },
};

module.exports = UserController;
