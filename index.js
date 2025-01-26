const name1 = document.getElementById('name'); // Element for name
const email = document.getElementById('email'); // Element for email
const phone = document.getElementById('phone'); // Element for phone
const address = document.getElementById('address'); // Element for address
const education = document.getElementById('education'); // Element for education
const experience = document.getElementById('experience'); // Element for experience

function generateResume() {
    // Get the values from the form
    // Generate the resume layout 
    // Display the resume
    document.getElementById('resume-output').innerHTML = resumeHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    
    function updatePreview() {
        const nameplaceholder = 'Name'; // Placeholder for name if not provided

        // Generate HTML content for resume
        resumeHTML = `
            <h2>${name1.value || nameplaceholder}</h2>
            <p><strong>Email:</strong> ${email.value}</p>
            <p><strong>Phone:</strong> ${phone.value}</p>
            <p><strong>Address:</strong> ${address.value}</p>
            <h3>Education</h3>
            <p>${education.value}</p>
            <h3>Experience</h3>
            <p>${experience.value}</p>
            <button id="download-pdf" style="display:block;" onclick="downloadPDF()">Download PDF</button>
        `;
        // Display the generated resume HTML
        document.getElementById('resume-output').innerHTML = resumeHTML;
    }

    updatePreview(); // Initial update of the preview

    // Update preview on input changes
    name1.addEventListener('input', updatePreview);
    email.addEventListener('input', updatePreview);
    phone.addEventListener('input', updatePreview);
    address.addEventListener('input', updatePreview);
    education.addEventListener('input', updatePreview);
    experience.addEventListener('input', updatePreview);
});

/* function downloadPDF() {
    const resumeElement = document.getElementById('resume-output');

    // Access jsPDF from the window.jspdf object
    const { jsPDF } = window.jspdf;

    // Use html2canvas to capture the resume as an image
    html2canvas(resumeElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();

        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 10, 10, 190, canvas.height * 190 / canvas.width);

        // Save the PDF
        pdf.save('resume.pdf');
    }).catch(function(error) {
        console.error('Error generating PDF: ', error);
    });
} */

function downloadPDF() {
    // Access jsPDF from the window.jspdf object
    const { jsPDF } = window.jspdf;
    
    // Create a new instance of jsPDF
    const pdf = new jsPDF();
    
    let y = 20; // Initial vertical position
    const lineWidth = 0.2; // Line width for horizontal lines

    // Add Name
    pdf.setFontSize(22); // Set font size for the name
    pdf.setFont("helvetica", "bold"); // Set font to Helvetica Bold
    pdf.text(name1.value, 79, y); // Add Name at the specified position
    y += 15; // Move y position down for the next section

    // Add Email
    pdf.setFontSize(16); // Set font size for the email
    pdf.setFont("helvetica", "bold"); // Set font to Helvetica Bold
    pdf.text(`Email: ${email.value}`, 15, y); // Add Email
    pdf.setLineWidth(lineWidth); // Set line width for the separator
    pdf.line(15, y + 1.5, pdf.internal.pageSize.width - 15, y + 1.5); // Add horizontal line
    y += 10; // Move y position down for the next section

    // Add Phone
    pdf.setFont("helvetica", "bold"); // Set font to Helvetica Bold
    pdf.text(`Phone: ${phone.value}`, 15, y); // Add Phone
    pdf.setLineWidth(lineWidth); // Set line width for the separator
    pdf.line(15, y + 1.5, pdf.internal.pageSize.width - 15, y + 1.5); // Add horizontal line
    y += 10; // Move y position down for the next section

    // Add Address
    pdf.setFont("helvetica", "bold"); // Set font to Helvetica Bold
    pdf.text(`Address: ${address.value}`, 15, y); // Add Address
    pdf.setLineWidth(lineWidth); // Set line width for the separator
    pdf.line(15, y + 1.5, pdf.internal.pageSize.width - 15, y + 1.5); // Add horizontal line
    y += 10; // Move y position down for the next section

    // Add Education Header
    pdf.setFontSize(18); // Set font size for the Education header
    pdf.setFont("helvetica", "bold"); // Set font to Helvetica Bold
    pdf.text('Education', 15, y); // Add Education header
    pdf.setLineWidth(lineWidth); // Set line width for the separator
    pdf.line(15, y + 1.5, pdf.internal.pageSize.width - 15, y + 1.5); // Add horizontal line
    y += 10; // Move y position down for the content

    // Handle Education text with line breaks
    pdf.setFontSize(14); // Set font size for the education content
    const educationLines = pdf.splitTextToSize(education.value, 190); // Split text into lines within a width of 190
    pdf.setFont("helvetica", "normal"); // Set font to Helvetica Normal for content
    pdf.text(educationLines, 15, y); // Add Education content
    const lineHeight = 7; // Line height for spacing
    y += educationLines.length * lineHeight; // Update y position after education content

    // Add Experience Header
    pdf.setFontSize(18); // Set font size for the Experience header
    pdf.setFont("helvetica", "bold"); // Set font to Helvetica Bold
    pdf.text('Experience', 15, y); // Add Experience header
    pdf.setLineWidth(lineWidth); // Set line width for the separator
    pdf.line(15, y + 1.5, pdf.internal.pageSize.width - 15, y + 1.5); // Add horizontal line
    y += 10; // Move y position down for the content

    // Handle Experience text with line breaks
    pdf.setFontSize(14); // Set font size for the experience content
    const experienceLines = pdf.splitTextToSize(experience.value, 190); // Split text into lines within a width of 190
    pdf.setFont("helvetica", "normal"); // Set font to Helvetica Normal for content
    pdf.text(experienceLines, 15, y); // Add Experience content
    y += experienceLines.length * lineHeight; // Update y position after experience content

    // Save the PDF
    pdf.save('resume.pdf');
}
