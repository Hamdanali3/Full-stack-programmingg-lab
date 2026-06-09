require("dotenv").config();

const { connectDB } = require("../config/db");
const Customer = require("../models/Customer");
const User = require("../models/User");

const customers = [
  ["Ali Raza", "ali.raza@example.com", "+92 300 1112233", "AeroSoft Solutions", "Islamabad, Pakistan", "Active", "Interested in monthly support package."],
  ["Sara Khan", "sara.khan@example.com", "+92 301 2223344", "Creative Pixel Studio", "Rawalpindi, Pakistan", "Lead", "Requested proposal for CRM training."],
  ["Usman Malik", "usman.malik@example.com", "+92 302 3334455", "Malik Traders", "Lahore, Pakistan", "Inactive", "No response after first invoice."],
  ["Ayesha Noor", "ayesha.noor@example.com", "+92 303 4445566", "Noor Logistics", "Karachi, Pakistan", "Active", "High-priority enterprise client."],
  ["Hassan Ahmed", "hassan.ahmed@example.com", "+92 304 5556677", "TechNest Labs", "Faisalabad, Pakistan", "Lead", "Needs product demo next week."],
  ["Maham Iqbal", "maham.iqbal@example.com", "+92 305 6667788", "Iqbal Foods", "Multan, Pakistan", "Active", "Uses quarterly billing."],
  ["Danish Farooq", "danish.farooq@example.com", "+92 306 7778899", "Farooq Builders", "Peshawar, Pakistan", "Inactive", "Contract paused until next quarter."],
  ["Zainab Tariq", "zainab.tariq@example.com", "+92 307 8889900", "Tariq Textiles", "Sialkot, Pakistan", "Lead", "Asked for pricing details."],
  ["Bilal Sheikh", "bilal.sheikh@example.com", "+92 308 9990011", "Sheikh Motors", "Gujranwala, Pakistan", "Active", "Requires invoice at month end."],
  ["Hira Javed", "hira.javed@example.com", "+92 309 1001122", "Javed Consultants", "Quetta, Pakistan", "Lead", "Potential consulting customer."],
  ["Omer Siddiqui", "omer.siddiqui@example.com", "+92 310 2112233", "Siddiqui Retail", "Hyderabad, Pakistan", "Active", "Requested dashboard customization."],
  ["Nimra Shah", "nimra.shah@example.com", "+92 311 3223344", "Shah Apparel", "Bahawalpur, Pakistan", "Inactive", "Needs follow-up after summer break."],
  ["Fahad Qureshi", "fahad.qureshi@example.com", "+92 312 4334455", "Qureshi Pharma", "Abbottabad, Pakistan", "Active", "Interested in yearly plan."],
  ["Laiba Saleem", "laiba.saleem@example.com", "+92 313 5445566", "Saleem Events", "Murree, Pakistan", "Lead", "Wants invoice generation demo."],
  ["Taha Mir", "taha.mir@example.com", "+92 314 6556677", "Mir Digital", "Islamabad, Pakistan", "Active", "Reference customer for demos."]
];

const seed = async () => {
  await connectDB();

  let user = await User.findOne({ email: "hamdan.crm@example.com" });

  if (!user) {
    user = await User.create({
      name: "HAMDAN ALI",
      email: "hamdan.crm@example.com",
      password: "Password123"
    });
  } else {
    user.name = "HAMDAN ALI";
    user.password = "Password123";
    await user.save();
  }

  await Customer.deleteMany({ createdBy: user._id });
  await Customer.insertMany(
    customers.map(([fullName, email, phone, company, address, status, notes]) => ({
      fullName,
      email,
      phone,
      company,
      address,
      status,
      notes,
      createdBy: user._id
    }))
  );

  console.log("Seed completed: 15 customers created.");
  console.log("Demo login: hamdan.crm@example.com / Password123");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
