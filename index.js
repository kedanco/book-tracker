var app = require("./server");

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.listen(PORT);
console.log("listening on http://localhost:" + PORT);
