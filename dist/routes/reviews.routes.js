"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/:id", auth_middleware_1.protect, review_controller_1.addReview);
router.get("/:id", review_controller_1.getReviewsForProduct);
exports.default = router;
