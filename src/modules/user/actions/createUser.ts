import {Action} from "../../_common/Action";
import {CreateUser} from "../schemes";

export const createUser: Action<typeof CreateUser> = async ({dataProvider}, _, {name}) => {
    const user = await dataProvider.user.create({name})
    await user.save()
    return {
        uuid: user.uuid,
        name: user.name,
    }
}
