



export function handleLocalStorage(field, newField, addedField, problem) {

    

    const problemArray = JSON.parse(localStorage.getItem('problemList'));
    const problemIndex = problemArray.findIndex(item => item.title === problem.title);
    if (problemIndex !== -1) {
        problemArray[problemIndex][addedField] = [...field, newField];
        console.log(problemArray[problemIndex].addedField);
        localStorage.setItem('problemList', JSON.stringify(problemArray));

    } else {
        console.log('Not found');
    }
}
