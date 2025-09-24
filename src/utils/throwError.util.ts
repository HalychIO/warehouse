import {AppErrorUtil} from "./AppError.util";
import IThrowErrorUtilParams from "../interfaces/IThrowErrorUtilParams.interface";

export default function throwErrorUtil({code, message}: IThrowErrorUtilParams) {
    throw new AppErrorUtil(code, message);
}