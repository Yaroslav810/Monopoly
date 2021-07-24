import {Context} from "../../../../core/routing/IRouter";
import {DataProvider} from "../../../model/DataProvider";
import {SessionStorage} from "../../../model/SessionStorage";

type Props = {name: string}

export async function sayHello(_: Context<DataProvider, SessionStorage>, {name}: Props) {
    return {
        message: `Hello ${name}`,
    }
}