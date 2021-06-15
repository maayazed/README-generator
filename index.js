const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const userprompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Project Title?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'Github Username?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email?',
        },
        {
            type: 'input',
            name: 'desc',
            message: 'Description of Project: ',
        },
        {
            type: 'input',
            name: 'install',
            message: '(How will the project be deployed?) Installation Instructions: ',
        },
        {
            type: 'input',
            name: 'guide',
            message: '(How will the project be used?) User Guide: ',
        },
        {
            type: 'input',
            name: 'test',
            message: '(How is the project being tested?) Test Guide: ',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Project License: ',
            choices: [
                'MIT',
                'Apache-2.0',
                'GPL',
                'BSD-3-Clause',
                'BSD-2-Clause',
                'LGPL',
                'Mozilla',
                'CDDL-1.0',
                'EPL-2.0',
            ],
        },
    ]);
};

const generateREADME = (data) =>
`<div align='center'>
<h1><strong>${data.title}</strong></h1>
</div>

### Badges: [![badge src!](https://img.shields.io/badge/license-${data.license}-blue)](https://opensource.org/licenses)


<div align='center'>
<strong>Table of Contents</strong>  
<hr>
    <p><a href='#desc'>Description</a></p>
    <p><a href='#install'>Installation</a></p>
    <p><a href='#user'>User Guidelines</a></p>
    <p><a href='#license'>Licensing</a></p>
    <p><a href='#contribute'>Contributors</a></p>
    <p><a href='#test'>Test Execution</a></p>
    <p><a href='#contact'>Contact</a></p>

<hr>
</div>

<div align='center'>
    <h3><a id='desc'>Description</a></h3>
</div>

<div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data.desc}
</div>

<hr>

<div align='center'>
    <h3><a id='install'>Installation</a></h3>
</div>

<div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5>Instructions: </h5>
${data.install}
</div>

<hr>

<div align='center'>
    <h3><a id='user'>User Guidelines</a></h3>
</div>

<div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5>Guide: </h5> 
${data.guide}
</div>

<hr>

<div align='center'>
    <h3><a id='license'>Licensing</a></h3>
</div>

<div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data.license} © ${data.github}
</div>

<hr>

<div align='center'>
    <h3><a id='contribute'>Contributors</a></h3>
</div>

<div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://github.com/${data.github}/'><img src='https://img.shields.io/badge/license-${data.github}-blue'></a>
</div>

<hr>

<div align='center'>
    <h3><a id='test'>Test Execution</a></h3>
</div>

<div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h4> Initialization: </h4>
${data.test}
</div>

<hr>

<div align='center'>
    <h3><a id='contact'>Contact</a></h3>
</div>

<div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h4>Github: <a href='https://github.com/${data.github}/'>${data.github}</a></h4>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h4>Email: ${data.email}</h4>
</div>

<hr>

<div align="center">Made With ❤️</div>`;

const init = () => {
    userprompt()
    .then((data) => writeFileAsync('README.md', generateREADME(data)))
    .then(() => console.log('Wrote to README.md'))
    .catch((err) => console.error(err));
};

init();