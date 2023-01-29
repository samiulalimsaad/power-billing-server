import { BillModel } from "../Models/Billing.Model.js";

export class BillingService {
    async billList(req, res) {
        try {
            const bills = await BillModel.find({});
            res.status(200).json({ success: true, bills });
        } catch (error) {
            res.status(502).json({ success: false, message: error.message });
        }
    }

    async addBill(req, res) {
        try {
            const data = BillValidationSchema.validateSync(req.body, {
                abortEarly: false,
            });
            const bill = new BillModel(data);
            await bill.save();
            res.status(200).json({ success: true, bill });
        } catch (error) {
            res.status(403).json({ success: false, message: error.errors });
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
            res.status(200).json({ success: true, bill });
        } catch (error) {
            res.status(502).json({
                success: false,
                message: error.message,
            });
        }
    }

    async deleteBill(req, res) {
        try {
            const bill = await BillModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ success: true, bill });
        } catch (error) {
            res.status(502).json({ success: false, message: error.message });
        }
    }
}
