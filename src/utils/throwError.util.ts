import {AppErrorUtil} from "./AppError.util";
import IThrowErrorParamsUtil from "../interfaces/IThrowErrorParams.interface";

export default function throwErrorUtil({code, message}: IThrowErrorParamsUtil) {
    throw new AppErrorUtil(code, message);
}