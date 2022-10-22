// This section helps us call our inquirer and fs package
const inquirer = require('inquirer')
const fs = require('fs')

// This generates our badge at the top of our README it also creates a clickable link to the licenses page.
const licenseBadge = (license) => {
    if (!license) {
        return ``;
    } else {
        return `[![${license} license](https://img.shields.io/badge/License-${license}-blueviolet.svg)](${licenseLink(license)})`
    }
};
// This section helps link the licenses of your choice to the website where information on the license will be.
const licenseLink = (license) => {
    if (license === 'MIT') {
        return `https://choosealicense.com/licenses/mit/`
    }
    if (license === 'GPLv3') {
        return `https://choosealicense.com/licenses/gpl-3.0/`
    }
    if (license === 'Apache') {
        return `https://choosealicense.com/licenses/apache-2.0/`

    }
    if (license === 'ISC')
        return `https://choosealicense.com/licenses/isc/`

};

// This function creates the license section and adds the license name depending on your choice.
const licenseSection = (license) => {
    if (!license) {
        return 'NO liscense'
    } else {
        return ` This application is covered under ${license}. Click on the badge for information about the license`

    }
}

// This section generates the whole README Document 
const genREADME = (data) => {

    return ` 
# ${data.title}

${licenseBadge(data.license)}

## Table of Contents 
- [Project description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Features](#features)
- [Contribution](#contribution)
- [Tests](#test)
- [Questions](#questions)

## Description
${data.description}

## Installation
${data.installation}

## Usage
${data.usage}

## Credits
${data.credit}

## Features
${data.features}

## Contribution
${data.contributing}

## Test 
${data.test}

## License
${licenseSection(data.license)}


## Questions 
* https://github.com/${data.userName}
* ${data.userEmail}

    `

};



// This section uses inquirer to create the prompts for the README file
inquirer
    .prompt([
        {
            type: 'input',
            message: 'Project title?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Described your project?',
            name: 'description',
        },
        {
            type: 'input',
            message: 'Explain the installatioon process?',
            name: 'installation',
        },
        {
            type: 'input',
            message: 'What is the usage?',
            name: 'Usage',
        },
        {
            type: 'input',
            message: 'who are your collaborators?',
            name: 'credit',
        },
        {
            type: 'input',
            message: 'what are the features of your project?',
            name: 'features',
        },

        {
            type: 'input',
            message: 'How to contribute',
            name: 'contributing',
        },
        {
            type: 'input',

            message: 'How do you test your application?',
            name: 'test',
        },
        {
            type: 'list',
            message: 'Choose your licenseing',
            name: 'license',
            choices: ['MIT', 'GPLv3', 'Apache', 'ISC'],
        },


        {
            type: 'input',
            message: 'what is your GitHub username',
            name: 'userName',
        },
        {
            type: 'input',
            message: 'what is your GitHub email adress?',
            name: 'userEmail',
        },


    ])
    // This section creates the README file and applies our answers.
    .then(data => {
        //console.log(answers)
        const readmeWrite = genREADME(data);
        fs.writeFile(`README.md`, readmeWrite, (err) => {
            err ? console.log(err) : console.log("File was created successfully")
        })
    });
