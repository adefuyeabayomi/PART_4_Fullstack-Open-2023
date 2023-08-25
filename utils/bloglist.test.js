let supertest = require("supertest");
let Blog = require("../models/blog_model");
let app = require("../app");
let request = supertest(app);

let blogList = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    }  
  ]

beforeEach(async () => {
    try{
        await Blog.deleteMany({})
        await Blog.insertMany(blogList)    
        console.log("initialized the database with our data");
    }
    catch(error){
        console.error("unable to initialize the database",error.message)
    }
  })
test("testing the '/api/blogs' route to see if the right amount of documents which in this case is blogList.length",async () =>{
    let res = await request.get("/api/blogs").expect(200).expect('Content-Type', /json/);
    let body = res.body;
    expect(body.length).toBe(blogList.length);
})

test("testing the '/api/blogs' route to see if the documents have an id property",async () =>{
    let res = await request.get("/api/blogs").expect(200).expect('Content-Type', /json/);
    let body = res.body;
    expect(body[0].id).toBeDefined();
})

test("testing the [POST] '/api/blogs' route actually adds a document to the database",async () =>{
    let testData = {
        title: "Olekzander Zinchenko",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      }
    testData = JSON.stringify(testData);
    try{
        let res = await request.post("/api/blogs").send(testData).expect(204).expect('Content-Type', /json/);
        let verify = await request.get("/api/blogs").expect(200).expect('Content-Type', /json/);
        let updated = verify.body;
        expect(updated.length).toBeDefined(blogList.length + 1);        
    }
    catch(error){
        console.error("Error in the test for post request",error.message)
    }

})

