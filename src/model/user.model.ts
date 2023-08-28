import { prop, getModelForClass, modelOptions, Severity, pre } from "@typegoose/typegoose";
import argon2 from "argon2";
import { nanoid } from "nanoid";


@pre<User>("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const hash = await argon2.hash(this.password);

    this.password = hash;

    return

})
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
export class User {
    @prop({
        required: true,
        unique: true,
        lowercase: true,
    })
    public email: string;

    @prop({
        required: true,
    })
    public firstName: string;

    @prop({
        required: true,
    })
    public lastName: string;

    @prop({
        required: true,
    })
    public password: string;

    @prop({
        required: true,
        default: () => nanoid(6),
    })
    public verificationCode: string;

    @prop()
    public passwordResetCode: string;

    @prop({
        default: false,
    })
    verified: boolean;
}

const UserModel = getModelForClass(User);

export default UserModel;