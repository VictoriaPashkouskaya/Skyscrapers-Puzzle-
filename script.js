function getValues() {
    const inputs = document.querySelectorAll('.input');
    const values = [];
    inputs.forEach(input => {
        values.push(parseInt(input.value) || 0);
    });
    return values;
}

function checkRow(row, startIndex, clueLeft, clueRight) {
    const N = row.length;
    let maxLeft = 0, countLeft = 0;
    let maxRight = 0, countRight = 0;

    for (let i = 0; i < N; i++) {
        if (row[i] > maxLeft) {
            maxLeft = row[i];
            countLeft++;
        }
        if (row[N - 1 - i] > maxRight) {
            maxRight = row[N - 1 - i];
            countRight++;
        }
    }
    return (clueLeft === countLeft || clueLeft === 0) && (clueRight === countRight || clueRight === 0);
}

function checkSolution() {
    const cluesTop = [4, 3, 2, 1];
    const cluesBottom = [1, 2, 2, 2];
    const cluesLeft = [4, 3, 2, 1];
    const cluesRight = [1, 2, 2, 2];
    const N = 4;

    const values = getValues();
    let isValid = true;

    for (let i = 0; i < N; i++) {
        const row = values.slice(i * N, (i + 1) * N);
        const clueLeft = cluesLeft[i];
        const clueRight = cluesRight[i];
        if (!checkRow(row, i * N, clueLeft, clueRight)) {
            isValid = false;
            break;
        }
    }

    for (let j = 0; j < N; j++) {
        const column = [];
        for (let i = 0; i < N; i++) {
            column.push(values[i * N + j]);
        }
        const clueTop = cluesTop[j];
        const clueBottom = cluesBottom[j];
        if (!checkRow(column, j, clueTop, clueBottom)) {
            isValid = false;
            break;
        }
    }

    const result = document.getElementById('result');
    if (isValid) {
        result.textContent = "Correct!";
        result.style.color = "green";
    } else {
        result.textContent = "Incorrect!";
        result.style.color = "red";
    }
}

