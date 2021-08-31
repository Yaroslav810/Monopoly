import {verifyExisting} from "../../../../core/http/httputils";
import {Action} from "../../_common/Action";
import {GetUser} from "../schemes";

export const getUser: Action<typeof GetUser> = async ({dataProvider}, {userUuid}) => {
    const user = verifyExisting(await dataProvider.user.getUserByUuid(userUuid))
    return {
        uuid: user.uuid,
        name: user.name,
    }
}
