const body = document.body;
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const successModal = document.getElementById('success-modal');
const feedbackDetailModal = document.getElementById('feedback-detail-modal');
const homePage = document.querySelector('main');
const footer = document.querySelector('footer');
const feedbackFormPage = document.getElementById('feedback-form-page');
const adminDashboardPage = document.getElementById('admin-dashboard-page');

// Auth tabs
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

// Forms
const studentLoginForm = document.getElementById('student-login-form');
const adminLoginForm = document.getElementById('admin-login-form');
const studentSignupForm = document.getElementById('student-signup-form');
const adminSignupForm = document.getElementById('admin-signup-form');
const messFeedbackForm = document.getElementById('mess-feedback-form');

// Buttons and links
const loginLink = document.getElementById('login-link');
const signupLink = document.getElementById('signup-link');
const studentCta = document.getElementById('student-cta');
const adminCta = document.getElementById('admin-cta');
const footerLogin = document.getElementById('footer-login');
const footerSignup = document.getElementById('footer-signup');
const studentSignupLink = document.getElementById('student-signup-link');
const adminSignupLink = document.getElementById('admin-signup-link');
const studentLoginLink = document.getElementById('student-login-link');
const adminLoginLink = document.getElementById('admin-login-link');
const logoutBtn = document.getElementById('logout-btn');
const adminLogoutBtn = document.getElementById('admin-logout-btn');
const closeButtons = document.querySelectorAll('.close-button');
const successOkBtn = document.getElementById('success-ok');
const detailCloseBtn = document.getElementById('detail-close');
const applyFiltersBtn = document.getElementById('apply-filters');
const resetFiltersBtn = document.getElementById('reset-filters');
const exportExcelBtn = document.getElementById('export-excel');
const exportPdfBtn = document.getElementById('export-pdf');

let students = [
    { id: 1, name: "Sarthak Verma", regNo: "23BCE2354", password: "student123" },
];

let admins = [
    { id: 1, name: "Admin User", employeeId: "EMP001", password: "admin123" }
];

let feedbackSubmissions = [
    {
        id: 1,
        regNo: "23BCE0233",
        studentName: "Abhigyan Prakhar",
        block: "A",
        roomNo: "203",
        messName: "L paid",
        messType: "Veg",
        category: "Quality",
        suggestion: "Food quality needs improvement",
        comments: "The rice was undercooked today and vegetables were not fresh.",
        proofFile: "proof.jpg",
        date: new Date("2025-03-15")
    },
    {
        id: 2,
        regNo: "23BCE0891",
        studentName: "Arnav Pratap",
        block: "L",
        roomNo: "606",
        messName: "K paid",
        messType: "Non-Veg",
        category: "Hygiene",
        suggestion: "Kitchen area needs better cleaning",
        comments: "Found hair in food twice this week.",
        date: new Date("2025-03-10")
    }
];

// Authentication state
let currentUser = null;
let userType = null;

// Navigation toggle for mobile
if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

// Tab switching functionality
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        
        // Update tab states
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update form visibility
        authForms.forEach(form => {
            form.classList.remove('active');
            if (form.id === target) {
                form.classList.add('active');
            }
        });
    });
});

// Modal handling
function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        body.style.overflow = 'auto'; // Restore scrolling
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => closeModal(modal));
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Close button functionality
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

// Success modal
function showSuccessMessage(title, message, callback) {
    document.getElementById('success-title').textContent = title;
    document.getElementById('success-message').textContent = message;
    
    openModal(successModal);
    
    successOkBtn.onclick = () => {
        closeModal(successModal);
        if (callback) callback();
    };
}

// Open login/signup modals
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(loginModal);
});

signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(signupModal);
});

footerLogin.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(loginModal);
});

footerSignup.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(signupModal);
});

// CTA buttons
studentCta.addEventListener('click', () => {
    openModal(loginModal);
    // Set active tab to student login
    authTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.target === 'student-login') {
            tab.classList.add('active');
        }
    });
    
    authForms.forEach(form => {
        form.classList.remove('active');
        if (form.id === 'student-login') {
            form.classList.add('active');
        }
    });
});

adminCta.addEventListener('click', () => {
    openModal(loginModal);
    // Set active tab to admin login
    authTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.target === 'admin-login') {
            tab.classList.add('active');
        }
    });
    
    authForms.forEach(form => {
        form.classList.remove('active');
        if (form.id === 'admin-login') {
            form.classList.add('active');
        }
    });
});

// Switch between login and signup
studentSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(signupModal);
    
    // Set active tab to student signup
    authTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.target === 'student-signup') {
            tab.classList.add('active');
        }
    });
    
    authForms.forEach(form => {
        form.classList.remove('active');
        if (form.id === 'student-signup') {
            form.classList.add('active');
        }
    });
});

adminSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(signupModal);
    
    // Set active tab to admin signup
    authTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.target === 'admin-signup') {
            tab.classList.add('active');
        }
    });
    
    authForms.forEach(form => {
        form.classList.remove('active');
        if (form.id === 'admin-signup') {
            form.classList.add('active');
        }
    });
});

studentLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signupModal);
    openModal(loginModal);
    
    // Set active tab to student login
    authTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.target === 'student-login') {
            tab.classList.add('active');
        }
    });
    
    authForms.forEach(form => {
        form.classList.remove('active');
        if (form.id === 'student-login') {
            form.classList.add('active');
        }
    });
});

adminLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signupModal);
    openModal(loginModal);
    
    // Set active tab to admin login
    authTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.target === 'admin-login') {
            tab.classList.add('active');
        }
    });
    
    authForms.forEach(form => {
        form.classList.remove('active');
        if (form.id === 'admin-login') {
            form.classList.add('active');
        }
    });
});

// Authentication Functions
function authenticateStudent(regNo, password) {
    return students.find(student => 
        student.regNo === regNo && student.password === password
    );
}

function authenticateAdmin(employeeId, password) {
    return admins.find(admin => 
        admin.employeeId === employeeId && admin.password === password
    );
}

function registerStudent(name, regNo, password) {
    // Check if registration number already exists
    if (students.some(student => student.regNo === regNo)) {
        return { success: false, message: "Registration number already exists." };
    }
    
    const newStudent = {
        id: students.length + 1,
        name: name,
        regNo: regNo,
        password: password
    };
    
    students.push(newStudent);
    return { success: true, student: newStudent };
}

function registerAdmin(name, employeeId, password) {
    // Check if employee ID already exists
    if (admins.some(admin => admin.employeeId === employeeId)) {
        return { success: false, message: "Employee ID already exists." };
    }
    
    const newAdmin = {
        id: admins.length + 1,
        name: name,
        employeeId: employeeId,
        password: password
    };
    
    admins.push(newAdmin);
    return { success: true, admin: newAdmin };
}

// Form Submissions
studentLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const regNo = document.getElementById('student-reg-no').value;
    const password = document.getElementById('student-password').value;
    
    const student = authenticateStudent(regNo, password);
    
    if (student) {
        currentUser = student;
        userType = 'student';
        closeAllModals();
        navigateToStudentDashboard();
    } else {
        alert('Invalid registration number or password');
    }
});

adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const employeeId = document.getElementById('admin-id').value;
    const password = document.getElementById('admin-password').value;
    
    const admin = authenticateAdmin(employeeId, password);
    
    if (admin) {
        currentUser = admin;
        userType = 'admin';
        closeAllModals();
        navigateToAdminDashboard();
    } else {
        alert('Invalid employee ID or password');
    }
});

studentSignupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('student-name').value;
    const regNo = document.getElementById('student-reg-no-signup').value;
    const password = document.getElementById('student-password-signup').value;
    const confirmPassword = document.getElementById('student-confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    const result = registerStudent(name, regNo, password);
    
    if (result.success) {
        showSuccessMessage('Registration Successful', 'Your student account has been created successfully. You can now log in.', () => {
            closeAllModals();
            openModal(loginModal);
            // Set active tab to student login
            authTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.target === 'student-login') {
                    tab.classList.add('active');
                }
            });
            
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === 'student-login') {
                    form.classList.add('active');
                }
            });
        });
    } else {
        alert(result.message);
    }
});

adminSignupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('admin-name').value;
    const employeeId = document.getElementById('admin-id-signup').value;
    const password = document.getElementById('admin-password-signup').value;
    const confirmPassword = document.getElementById('admin-confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    const result = registerAdmin(name, employeeId, password);
    
    if (result.success) {
        showSuccessMessage('Registration Successful', 'Your admin account has been created successfully. You can now log in.', () => {
            closeAllModals();
            openModal(loginModal);
            // Set active tab to admin login
            authTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.target === 'admin-login') {
                    tab.classList.add('active');
                }
            });
            
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === 'admin-login') {
                    form.classList.add('active');
                }
            });
        });
    } else {
        alert(result.message);
    }
});

// Navigation Functions
function navigateToStudentDashboard() {
    homePage.classList.add('hidden');
    footer.classList.add('hidden');
    adminDashboardPage.classList.add('hidden');
    feedbackFormPage.classList.remove('hidden');
    
    // Prefill student information
    document.getElementById('feedback-reg-no').value = currentUser.regNo;
    document.getElementById('feedback-name').value = currentUser.name;
}

function navigateToAdminDashboard() {
    homePage.classList.add('hidden');
    footer.classList.add('hidden');
    feedbackFormPage.classList.add('hidden');
    adminDashboardPage.classList.remove('hidden');
    
    // Load feedback data
    loadFeedbackData(feedbackSubmissions);
    updateSummaryStats();
}

function navigateToHome() {
    feedbackFormPage.classList.add('hidden');
    adminDashboardPage.classList.add('hidden');
    homePage.classList.remove('hidden');
    footer.classList.remove('hidden');
    
    currentUser = null;
    userType = null;
}

// Logout functionality
logoutBtn.addEventListener('click', navigateToHome);
adminLogoutBtn.addEventListener('click', navigateToHome);

// Feedback Form Submission
messFeedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const regNo = document.getElementById('feedback-reg-no').value;
    const studentName = document.getElementById('feedback-name').value;
    const block = document.getElementById('feedback-block').value;
    const roomNo = document.getElementById('feedback-room').value;
    const messName = document.getElementById('feedback-mess-name').value;
    const messType = document.querySelector('input[name="mess-type"]:checked').value;
    const category = document.querySelector('input[name="category"]:checked').value;
    const suggestion = document.getElementById('feedback-suggestion').value;
    const comments = document.getElementById('feedback-comments').value;
    
    // Handle file upload (in a real app, this would save to server)
    const proofFile = document.getElementById('feedback-proof').files[0];
    let proofFileName = '';
    
    if (proofFile) {
        proofFileName = proofFile.name;
    }
    
    // Create new feedback submission
    const newFeedback = {
        id: feedbackSubmissions.length + 1,
        regNo,
        studentName,
        block,
        roomNo,
        messName,
        messType,
        category,
        suggestion,
        comments,
        proofFile: proofFileName,
        date: new Date()
    };
    
    feedbackSubmissions.push(newFeedback);
    
    showSuccessMessage('Feedback Submitted', 'Your feedback has been submitted successfully. Thank you for your input!', () => {
        messFeedbackForm.reset();
        // Prefill student information again
        document.getElementById('feedback-reg-no').value = currentUser.regNo;
        document.getElementById('feedback-name').value = currentUser.name;
    });
});

// Admin Dashboard Functions
function loadFeedbackData(data) {
    const tableBody = document.getElementById('feedback-data');
    tableBody.innerHTML = '';
    
    data.forEach(feedback => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${feedback.id}</td>
            <td>${feedback.studentName}</td>
            <td>${feedback.regNo}</td>
            <td>${feedback.messName}</td>
            <td>${feedback.block}</td>
            <td>${feedback.category}</td>
            <td>${formatDate(feedback.date)}</td>
            <td>
                <button class="btn btn-secondary view-details" data-id="${feedback.id}">View</button>
            </td>
        `;
        
        tableBody.appendChild(tr);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', () => {
            const feedbackId = parseInt(button.dataset.id);
            const feedback = feedbackSubmissions.find(f => f.id === feedbackId);
            
            if (feedback) {
                showFeedbackDetails(feedback);
            }
        });
    });
}

function showFeedbackDetails(feedback) {
    const detailContent = document.getElementById('feedback-detail-content');
    
    detailContent.innerHTML = `
        <div class="detail-item">
            <h4>Student Information</h4>
            <p>Name: ${feedback.studentName}</p>
            <p>Registration Number: ${feedback.regNo}</p>
            <p>Block: ${feedback.block}</p>
            <p>Room Number: ${feedback.roomNo}</p>
        </div>
        <div class="detail-item">
            <h4>Mess Information</h4>
            <p>Mess Name: ${feedback.messName}</p>
            <p>Mess Type: ${feedback.messType}</p>
        </div>
        <div class="detail-item">
            <h4>Feedback Details</h4>
            <p>Category: ${feedback.category}</p>
            <p>Suggestion: ${feedback.suggestion}</p>
            <p>Comments: ${feedback.comments}</p>
            ${feedback.proofFile ? `<p>Proof File: ${feedback.proofFile}</p>` : ''}
            <p>Submitted on: ${formatDate(feedback.date)}</p>
        </div>
    `;
    
    openModal(feedbackDetailModal);
}

function updateSummaryStats() {
    const totalFeedback = feedbackSubmissions.length;
    
    // Get current date for weekly and monthly calculations
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    
    // Count feedback within last week and month
    const weeklyFeedback = feedbackSubmissions.filter(f => 
        f.date >= oneWeekAgo
    ).length;
    
    const monthlyFeedback = feedbackSubmissions.filter(f => 
        f.date >= oneMonthAgo
    ).length;
    
    // Update summary cards
    document.getElementById('total-feedback').textContent = totalFeedback;
    document.getElementById('weekly-feedback').textContent = weeklyFeedback;
    document.getElementById('monthly-feedback').textContent = monthlyFeedback;
}

// Apply filters
applyFiltersBtn.addEventListener('click', () => {
    const studentFilter = document.getElementById('filter-student').value.toLowerCase();
    const messFilter = document.getElementById('filter-mess').value.toLowerCase();
    const blockFilter = document.getElementById('filter-block').value.toLowerCase();
    const startDate = document.getElementById('filter-start-date').value;
    const endDate = document.getElementById('filter-end-date').value;
    
    let filteredData = [...feedbackSubmissions];
    
    // Apply filters
    if (studentFilter) {
        filteredData = filteredData.filter(f => 
            f.regNo.toLowerCase().includes(studentFilter) || 
            f.studentName.toLowerCase().includes(studentFilter)
        );
    }
    
    if (messFilter) {
        filteredData = filteredData.filter(f => 
            f.messName.toLowerCase().includes(messFilter)
        );
    }
    
    if (blockFilter) {
        filteredData = filteredData.filter(f => 
            f.block.toLowerCase().includes(blockFilter)
        );
    }
    
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59); // Include the entire end day
        
        filteredData = filteredData.filter(f => 
            f.date >= start && f.date <= end
        );
    } else if (startDate) {
        const start = new Date(startDate);
        filteredData = filteredData.filter(f => f.date >= start);
    } else if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59);
        filteredData = filteredData.filter(f => f.date <= end);
    }
    
    // Update table with filtered data
    loadFeedbackData(filteredData);
});

// Reset filters
resetFiltersBtn.addEventListener('click', () => {
    document.getElementById('filter-student').value = '';
    document.getElementById('filter-mess').value = '';
    document.getElementById('filter-block').value = '';
    document.getElementById('filter-start-date').value = '';
    document.getElementById('filter-end-date').value = '';
    
    loadFeedbackData(feedbackSubmissions);
});

// Export functionality (simplified - in a real app, would generate actual files)
exportExcelBtn.addEventListener('click', () => {
    alert('Exporting to Excel... (This would generate a real Excel file in a production app)');
});

exportPdfBtn.addEventListener('click', () => {
    alert('Exporting to PDF... (This would generate a real PDF file in a production app)');
});

// Utility Functions
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Initialize dashboard if localStorage has user data
document.addEventListener('DOMContentLoaded', () => {
    // In a real app, would check localStorage or sessionStorage for login state
    // For demo purposes, we'll just ensure dashboards are hidden on page load
    feedbackFormPage.classList.add('hidden');
    adminDashboardPage.classList.add('hidden');
});

// Additional event listeners for detail modal
detailCloseBtn.addEventListener('click', () => {
    closeModal(feedbackDetailModal);
});