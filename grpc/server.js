import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"

const PROTO_PATH = "./problems.proto"
const options ={
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options)

const problemsProto= grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

let problems = [
    {
        id: "0",
        title: "Polyfill of Array.map",
        description: "Some description",
    },
    {
        id: "1",
        title: "Polyfill of Promise.all()",
        description: "Some description",
    }
];

server.addService(problemsProto.ProblemService.service,{
    getAllProblems: (_, callback)=>{},
    updateProblem: (call, callback)=>{},
})

server.bindAsync()
// too complicated