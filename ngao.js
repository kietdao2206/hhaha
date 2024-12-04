// API Key và ID của bảng tính Google Sheets
const apiKey = 'AIzaSyCJOJPD0urzoEzIAXiODvGtcba2cHOuSro';  // Thay bằng API Key của bạn
const spreadsheetId = '1cyCSxXcWiI_nqEl4LerXLLfScGWvYCEapAYidAw5RX8';  // Thay bằng ID bảng tính của bạn

// Hàm lấy dữ liệu thống kê
function getStatistics() {
    const date = document.getElementById('date').value; 
    const range = `Sheet1!A:F`;  // Đảm bảo rằng bạn đang lấy dữ liệu trong phạm vi từ A đến F

    if (!date) {
        alert('Vui lòng chọn ngày');
        return;
    }

    // Gọi Google Sheets API để lấy dữ liệu
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            const filteredData = rows.filter(row => row[0] === date);  // Lọc theo ngày nhập vào
            displayStatistics(filteredData);
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu từ Google Sheets:', error);
            alert('Có lỗi xảy ra khi lấy dữ liệu.');
        });
}

// Hàm hiển thị thống kê lên giao diện
function displayStatistics(data) {
    const content = document.getElementById('statisticsContent');
    content.innerHTML = '';  // Xóa nội dung cũ

    if (data.length === 0) {
        content.innerHTML = '<p>Không có dữ liệu cho ngày đã chọn.</p>';
    } else {
        let html = '<table border="1"><tr><th>Ngày</th><th>Số lượng</th><th>Red</th><th>Green</th><th>Blue</th><th>Error</th></tr>';

        // Duyệt qua dữ liệu và tạo bảng
        data.forEach(row => {
            html += `<tr>
                        <td>${row[0]}</td>
                        <td>${row[1]}</td>
                        <td>${row[2]}</td>
                        <td>${row[3]}</td>
                        <td>${row[4]}</td>
                        <td>${row[5]}</td>
                      </tr>`;
        });

        html += '</table>';
        content.innerHTML = html;  // Hiển thị dữ liệu lên giao diện
    }
}
function listenToAlert() {
    const alertRef = ref(db, 'alert');
    onValue(alertRef, (snapshot) => {
        const alertData = snapshot.val();
        if (alertData === "true") {
            console.log("Phát hiện báo cháy! Chuyển trang...");
            window.location.href = "alert.html";
        }
    });
}

