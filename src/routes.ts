import {Router} from 'express'
import GroupsController from './controllers/GroupsController'
import UsersController from './controllers/UsersController'

const routes = Router();


routes.post('/group', GroupsController.create)
routes.post('/user', UsersController.create)
routes.post('/multiUsers',UsersController.getMultiGroupsId)
routes.post('/groupStart', GroupsController.startGroup)
routes.post('/userStart', UsersController.startUsers)
routes.post('/groupsId', GroupsController.indexSingleById)
routes.get('/group', GroupsController.index);
routes.get ('/user',UsersController.index)
routes.post('/userId',UsersController.indexById)
routes.post('/indexByGroup',UsersController.indexByGroup)

routes.post('/checkPassword',GroupsController.checkPassword)

export default routes