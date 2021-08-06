import {Context} from "../../../../core/routing/IRouter";
import {DataProvider} from "../../../model/DataProvider";
import {SessionStorage} from "../../../model/SessionStorage";

type Props = {name: string}

export async function createUser({dataProvider}: Context<DataProvider, SessionStorage>, _: unknown, {name}: Props) {
    const user = await dataProvider.user.create({name})
    await user.save()
    return {
        id: user.id,
        name: user.name,
    }
}
