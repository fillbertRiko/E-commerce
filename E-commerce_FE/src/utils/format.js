/**
 * Format số tiền sang định dạng tiền tệ Việt Nam
 * @param {number} amount - Số tiền cần format
 * @returns {string} Chuỗi đã được format (vd: 1.000.000đ)
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

/**
 * Format ngày tháng sang định dạng Việt Nam
 * @param {string|Date} date - Ngày cần format
 * @returns {string} Chuỗi ngày đã được format (vd: 01/01/2024)
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN').format(new Date(date));
};

/**
 * Format số điện thoại sang định dạng Việt Nam
 * @param {string} phone - Số điện thoại cần format
 * @returns {string} Chuỗi số điện thoại đã được format (vd: 0123.456.789)
 */
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
  if (match) {
    return match[1] + '.' + match[2] + '.' + match[3];
  }
  return phone;
};

/**
 * Rút gọn văn bản nếu quá dài
 * @param {string} text - Văn bản cần rút gọn
 * @param {number} maxLength - Độ dài tối đa
 * @returns {string} Văn bản đã được rút gọn
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Format kích thước file
 * @param {number} bytes - Kích thước file tính bằng bytes
 * @returns {string} Chuỗi kích thước đã được format (vd: 1.5 MB)
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format địa chỉ
 * @param {Object} address - Đối tượng chứa thông tin địa chỉ
 * @returns {string} Chuỗi địa chỉ đã được format
 */
export const formatAddress = (address) => {
  const parts = [
    address.street,
    address.ward,
    address.district,
    address.city,
    'Việt Nam'
  ].filter(Boolean);
  
  return parts.join(', ');
}; 