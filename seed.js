// colocar query do MongoDB
db.users.insertOne({
    name: "Erick Jacquin",
    email: "erickjacquin@gmail.com",
    password: "12345678",
    role: "user",
});

db.recipes.insertOne({
    name: "Receita do Jacquin",
    ingredients: "Frango",
    preparation: "10 minutos no forno",
});
