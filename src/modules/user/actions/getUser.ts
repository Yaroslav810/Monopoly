import {verifyExisting} from "../../../../core/http/httputils";
import {Action} from "../../_common/Action";
import {GetUser} from "../schemes";

export const getUser: Action<typeof GetUser> = async ({dataProvider}, {userId}) => {
    const user = verifyExisting(await dataProvider.user.get(userId))
    return {
        id: user.id,
        name: user.name,
    }
}
