import {Context} from "../../../../core/routing/IRouter";
import {DataProvider} from "../../../model/DataProvider";
import {SessionStorage} from "../../../model/SessionStorage";
import {verifyExisting} from "../../../../core/http/httputils";

export async function getUser({dataProvider}: Context<DataProvider, SessionStorage>, {userId}: {userId: string}) {
    const user = verifyExisting(await dataProvider.user.get(userId))
    return {
        id: user.id,
        name: user.name,
    }
}
