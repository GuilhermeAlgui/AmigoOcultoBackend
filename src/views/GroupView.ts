import Group from "../models/Group";

export default{
    render(group: Group){
        return{
            id: group.id,
            name: group.name,
            code: group.code,
            started: group.started,
            users: group.users,
            password: group.password,
            qtdMember: group.qtdMember,
        }
    }
}