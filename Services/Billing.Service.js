import { BillModel } from "../Models/Billing.Model.js";
import { billValidationSchema } from "../utils/validationSchema.js";

export class BillingService {
    async search(req, res) {
        try {
            const text = req.query.text;

            let ids = [];

            const namesBills = await BillModel.find({
                fullName: { $regex: ".*" + text + ".*" },
            });
            ids = [...ids, ...namesBills.map((v) => v._id.toString())];

            const emailsBills = await BillModel.find({
                email: { $regex: ".*" + text + ".*" },
            });
            ids = [...ids, ...emailsBills.map((b) => b._id.toString())];

            const phonesBills = await BillModel.find({
                phone: { $regex: ".*" + text + ".*" },
            });
            console.log(ids.length);
            ids = [...ids, ...phonesBills.map((b) => b._id.toString())];
            console.log(ids.length);

            const bills = await BillModel.find({
                _id: { $in: [...new Set(ids)] },
            });

            res.status(200).json(bills);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async billList(req, res) {
        try {
            const page = +req.query.page || 1;
            console.log(page);
            const bills = await BillModel.find()
                .limit(10)
                .skip((page - 1) * 10)
                .sort({ createdAt: -1 });

            const count = await BillModel.estimatedDocumentCount();
            res.status(200).json({ bills, count });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async totalBillAmount(req, res) {
        try {
            const bill = await BillModel.find();
            const total = bill.reduce((p, c) => p + c.paidAmount, 0);
            console.log(total);
            return res.status(200).json(total);
        } catch (error) {
            res.status(500).json({ success: false, errors: error.errors });
        }
    }

    async addBill(req, res) {
        try {
            const data = billValidationSchema.validateSync(req.body, {
                abortEarly: false,
            });
            const bill = new BillModel(data);
            await bill.save();
            res.status(200).json(bill);
        } catch (error) {
            res.status(403).json({ success: false, errors: error.errors });
        }
    }

    async updateBill(req, res) {
        try {
            const bill = await BillModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            );
            res.status(200).json(bill);
        } catch (error) {
            res.status(500).json({
                success: false,
                errors: error.message,
            });
        }
    }

    async deleteBill(req, res) {
        try {
            const bill = await BillModel.findByIdAndDelete(req.params.id);
            res.status(200).json(bill);
        } catch (error) {
            res.status(500).json({ success: false, errors: error.message });
        }
        {
        }
    }
}
