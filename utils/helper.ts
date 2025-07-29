export const toPersianNumber = (number: number | null | undefined, split: boolean = true): string => {
    if (number == null) return "۰";

    const digits = '۰۱۲۳۴۵۶۷۸۹';

    if (split) {
        const withCommas = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
        return withCommas.replace(/\d/g, d => digits[+d]);
    } else {
        return number.toString().replace(/\d/g, d => digits[+d]);
    }
};
