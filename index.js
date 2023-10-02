const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, name, id, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.log(allContacts);

    case "get":
      const oneBook = await getContactById(id);
      console.log(oneBook);
      break;
    case "remove":
      const removeBook = await removeContact(id);
      console.log(removeBook);
      break;
    case "add":
      const addBook = await addContact({ name, email, phone });
      console.log(addBook);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
