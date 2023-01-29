import { BillModel } from "../Models/Billing.Model.js";
import { billValidationSchema } from "../utils/validationSchema.js";

export class BillingService {
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
            res.status(502).json(error);
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
            res.status(502).json({
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
            res.status(502).json({ success: false, errors: error.message });
        }
    }
}
