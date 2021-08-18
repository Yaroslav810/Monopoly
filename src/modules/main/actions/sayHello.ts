import {Action} from "../../_common/Action";
import {SayHello} from "../schemes";

export const sayHello: Action<typeof SayHello> = async (_, {name}) => {
    return {
        message: `Hello ${name}`,
    }
}