import {model, Schema, models} from "mongoose"

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export const Category = models?.Category || model("Category", categorySchema)
