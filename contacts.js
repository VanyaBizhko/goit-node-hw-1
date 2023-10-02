const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, "db", "contacts.json");


const listContacts = async () => {

  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};


const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(item=> item.id === contactId);
  if (index === -1) {
    return null;
    }
    const [deletedContact] = allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
     return deletedContact;
};

const addContact = async (data) => {

  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
    };
    
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact || null;
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};