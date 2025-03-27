async function fetchPrayerTimes() {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/calendar?latitude=36.4795&longitude=2.8333&method=2`
      );
      const data = await response.json();

      const times = data.data.slice(0, 30).map(day => ({
        date: day.date.gregorian.date,
        fajr: day.timings.Fajr,
        sunrise: day.timings.Sunrise,
        dhuhr: day.timings.Dhuhr,
        asr: day.timings.Asr,
        maghrib: day.timings.Maghrib,
        isha: day.timings.Isha,
      }));

      const tableBody = document.querySelector('#prayer-times-table tbody');
      tableBody.innerHTML = ''; // تفريغ الجدول قبل إعادة تعبئته

      times.forEach((time, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${time.date}</td>
          <td>${time.fajr}</td>
          <td>${time.sunrise}</td>
          <td>${time.dhuhr}</td>
          <td>${time.asr}</td>
          <td>${time.maghrib}</td>
          <td>${time.isha}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Failed to fetch prayer times:', error);
    }
  }

  // استدعاء الدالة عند تحميل الصفحة
  fetchPrayerTimes();






  
   function startCountdown(targetTime, elementId) {
      function updateCountdown() {
          const now = new Date();
          const target = new Date();
          const [hours, minutes] = targetTime.split(':');
          target.setHours(parseInt(hours, 10));
          target.setMinutes(parseInt(minutes, 10));
          target.setSeconds(0);

          // إذا كان الوقت المستهدف في اليوم التالي
          if (target < now) {
              target.setDate(target.getDate() + 1);
          }

          const diff = target - now;

          if (diff > 0) {
              const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
              const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

              document.getElementById(elementId).textContent =
                  `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
          } else {
              document.getElementById(elementId).textContent = '00:00:00';
          }
      }

      // تحديث العد كل ثانية
      setInterval(updateCountdown, 1000);
      updateCountdown(); // تحديث فوري عند تحميل الصفحة
  }

  // تفعيل العد التنازلي
  startCountdown('05:30', 'imsak-countdown');
  startCountdown('19:15', 'iftar-countdown');

  async function generatePrayerTimes() {
    const container = document.getElementById("prayerTimes");
    container.innerHTML = "";

    const headers = ["Date", "Fajr", "Sunrise", "Zuhr", "Asr", "Maghrib", "Isha", "Midnight"];
    headers.forEach(header => {
      const div = document.createElement("div");
      div.classList.add("header");
      div.textContent = header;
      container.appendChild(div);
    });

    const now = new Date();
    const lat = 36.7528;
    const lon = 3.0422;
    const method = 2; // رابطة العالم الإسلامي

    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);

      const prayerTimes = ["5:30 AM", "6:45 AM", "12:30 PM", "3:45 PM", "6:00 PM", "7:15 PM", "12:00 AM"];
      prayerTimes.unshift(date.toDateString());

      prayerTimes.forEach(time => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.textContent = time;
        container.appendChild(div);
      });
    }
  }

  generatePrayerTimes();