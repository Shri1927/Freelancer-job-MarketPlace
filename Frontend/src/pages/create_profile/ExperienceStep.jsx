import React, { useState } from 'react';
import { User, Plus, X, Pencil, Trash2, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

// JSON Data with step5
const profileData = {
    step5: {
        id: 5,
        currentStep: 5,
        totalSteps: 10,
        title: "If you have relevant work experience, add it here.",
        description: "Freelancers who add their experience are twice as likely to win work. But if you're just starting out, you can still create a great profile. Just head on to the next page."
    }
};

const ExperienceStep = ({ onBack, onSkip, onNext, showIndividualProgress = true }) => {
    const { step5 } = profileData;
    const [experiences, setExperiences] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [experienceToDelete, setExperienceToDelete] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [editingExperienceId, setEditingExperienceId] = useState(null);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        current: false,
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        description: "",
    });

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    const years = Array.from({ length: 30 }, (_, i) => 2025 - i);

    const progress = (step5.currentStep / step5.totalSteps) * 100;

    // Calculate slides based on 2 experiences per slide
    const experiencesPerSlide = 2;
    const totalSlides = Math.ceil(experiences.length / experiencesPerSlide);

    const animateTransition = (callback) => {
        setIsAnimating(true);
        setTimeout(() => {
            callback();
            setTimeout(() => setIsAnimating(false), 300);
        }, 300);
    };

    // Show success notification
    const showNotification = (message) => {
        setNotificationMessage(message);
        setShowSuccessNotification(true);
        setTimeout(() => {
            setShowSuccessNotification(false);
        }, 3000);
    };

    const handleAddExperience = () => {
        setEditingExperienceId(null);
        setFormData({
            title: "",
            company: "",
            location: "",
            current: false,
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            description: "",
        });
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingExperienceId(null);
        setFormData({
            title: "",
            company: "",
            location: "",
            current: false,
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            description: "",
        });
    };

    const handleSaveExperience = () => {
        if (!formData.title || !formData.company || !formData.startMonth || !formData.startYear) return;

        let period;
        if (formData.current) {
            period = `${formData.startMonth} ${formData.startYear} - Present`;
        } else {
            if (!formData.endMonth || !formData.endYear) return;
            period = `${formData.startMonth} ${formData.startYear} - ${formData.endMonth} ${formData.endYear}`;
        }

        const experienceData = {
            title: formData.title,
            company: formData.company,
            period: period,
            location: formData.location,
            description: formData.description
        };

        if (editingExperienceId) {
            // Update existing experience
            setExperiences(prev =>
                prev.map(exp =>
                    exp.id === editingExperienceId
                        ? { ...exp, ...experienceData }
                        : exp
                )
            );
            showNotification("Experience details updated successfully!");
        } else {
            // Create new experience
            const newExperience = {
                id: Date.now().toString(),
                ...experienceData
            };
            setExperiences((prev) => [...prev, newExperience]);
            showNotification("Experience added successfully!");
        }

        handleCloseForm();
    };

    const handleDeleteClick = (experience) => {
        setExperienceToDelete(experience);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (experienceToDelete) {
            const newExperiences = experiences.filter((exp) => exp.id !== experienceToDelete.id);
            setExperiences(newExperiences);

            // Adjust current slide if needed
            const newTotalSlides = Math.ceil(newExperiences.length / experiencesPerSlide);
            if (currentSlide >= newTotalSlides) {
                setCurrentSlide(Math.max(0, newTotalSlides - 1));
            }

            showNotification("Experience removed successfully!");
        }
        setShowDeleteModal(false);
        setExperienceToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setExperienceToDelete(null);
    };

    const handleEditExperience = (experience) => {
        const periodParts = experience.period.split(' - ');
        const startParts = periodParts[0].split(' ');
        const isCurrent = periodParts[1] === 'Present';

        setEditingExperienceId(experience.id);
        setFormData({
            title: experience.title,
            company: experience.company,
            location: experience.location,
            current: isCurrent,
            startMonth: startParts[0],
            startYear: startParts[1],
            endMonth: isCurrent ? '' : periodParts[1].split(' ')[0],
            endYear: isCurrent ? '' : periodParts[1].split(' ')[1],
            description: experience.description
        });
        setShowForm(true);
    };

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Default icon for all experiences
    const ExperienceIcon = () => (
        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        </div>
    );

    const handleNext = () => {
        animateTransition(onNext);
    };

    const handleBack = () => {
        animateTransition(onBack);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
            {/* Success Notification */}
            {showSuccessNotification && (
                <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
                    <div className="bg-primary/10 border border-primary/20 rounded-lg shadow-medium p-4 max-w-sm backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            {/* Animated Checkmark */}
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-bounce">
                                    <svg
                                        className="w-5 h-5 text-primary-foreground animate-checkmark"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        style={{
                                            animation: 'checkmark 0.5s ease-in-out'
                                        }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-primary font-medium text-sm">
                                    {notificationMessage}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowSuccessNotification(false)}
                                className="flex-shrink-0 p-1 hover:bg-primary/10 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-primary" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="relative z-4 max-w-6xl mx-auto px-4 py-12 flex items-center justify-center">
                <div className="w-full max-w-6xl mx-auto">

                    {/* Main Content Container */}
                    <div className={`bg-card/80 backdrop-blur-lg rounded-xl md:rounded-2xl border border-border/20 shadow-medium p-4 md:p-6 mb-6 transition-all duration-500 ${
                        isAnimating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
                    }`}>
                        {/* Question Header */}
                        <div className="text-center mb-6 md:mb-8">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 px-3 py-1 md:px-4 md:py-2 rounded-full mb-4">
                                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                                <span className="text-xs md:text-sm font-semibold text-primary">
                                    Question {step5.currentStep}
                                </span>
                            </div>
                            
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
                                {step5.title}
                            </h2>
                            
                            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                {step5.description}
                            </p>
                        </div>

                        {/* Experience List - 2 Experiences Per Slide */}
                        {experiences.length > 0 && (
                            <div className="mb-8">
                                <div className="relative">
                                    {/* Navigation Arrows - Only show if more than 2 experiences */}
                                    {experiences.length > experiencesPerSlide && (
                                        <>
                                            <button
                                                onClick={prevSlide}
                                                disabled={currentSlide === 0}
                                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-8 h-8 md:w-12 md:h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full shadow-medium flex items-center justify-center hover:bg-background hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                            >
                                                <svg className="w-4 h-4 md:w-6 md:h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={nextSlide}
                                                disabled={currentSlide === totalSlides - 1}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-8 h-8 md:w-12 md:h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full shadow-medium flex items-center justify-center hover:bg-background hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                            >
                                                <svg className="w-4 h-4 md:w-6 md:h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </>
                                    )}

                                    {/* Experience Cards Container */}
                                    <div className="overflow-hidden">
                                        <div
                                            className="flex transition-transform duration-300 ease-in-out"
                                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                        >
                                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                                <div
                                                    key={slideIndex}
                                                    className="w-full flex-shrink-0"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-2 md:px-4">
                                                        {experiences
                                                            .slice(slideIndex * experiencesPerSlide, slideIndex * experiencesPerSlide + experiencesPerSlide)
                                                            .map((experience) => (
                                                                <div
                                                                    key={experience.id}
                                                                    className="border-2 border-border rounded-xl md:rounded-2xl p-4 md:p-6 bg-primary/10 backdrop-blur-sm hover:border-primary hover:shadow-soft transition-all duration-300 relative group"
                                                                >
                                                                    {/* Edit and Delete Buttons */}
                                                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 md:gap-2">
                                                                        <button
                                                                            onClick={() => handleEditExperience(experience)}
                                                                            className="p-1 md:p-2 hover:bg-primary/10 rounded-lg transition-colors"
                                                                        >
                                                                            <Pencil className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteClick(experience)}
                                                                            className="p-1 md:p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                                                                        >
                                                                            <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-destructive" />
                                                                        </button>
                                                                    </div>

                                                                    {/* Experience Content with Icon */}
                                                                    <div className="flex items-start gap-3 md:gap-4 pr-12">
                                                                        <ExperienceIcon />
                                                                        <div className="flex-1 min-w-0">
                                                                            <h3 className="text-base md:text-lg font-bold text-foreground mb-1">
                                                                                {experience.title}
                                                                            </h3>
                                                                            <p className="text-foreground/80 text-sm md:text-base mb-1">
                                                                                {experience.company} | {experience.period}
                                                                            </p>
                                                                            <p className="text-muted-foreground text-xs md:text-sm mb-2">
                                                                                {experience.location}
                                                                            </p>
                                                                            {experience.description && (
                                                                                <p className="text-muted-foreground text-xs md:text-sm mt-2 md:mt-3 leading-relaxed">
                                                                                    {experience.description}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                        {/* Fill empty slots if needed for the last slide */}
                                                        {Array.from({ length: experiencesPerSlide - (experiences.length - slideIndex * experiencesPerSlide) }).map((_, index) => (
                                                            <div key={`empty-${index}`} className="border-2 border-transparent rounded-xl md:rounded-2xl p-4 md:p-6" />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Circle Navigation Dots - Centered */}
                                    {totalSlides > 1 && (
                                        <div className="flex justify-center mt-6 md:mt-8 space-x-2 md:space-x-3">
                                            {Array.from({ length: totalSlides }).map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => goToSlide(index)}
                                                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${index === currentSlide
                                                            ? "bg-primary scale-125"
                                                            : "bg-muted hover:bg-muted-foreground/50"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Slide Counter - Centered */}
                                    {totalSlides > 1 && (
                                        <div className="text-center mt-3 md:mt-4 text-xs md:text-sm text-muted-foreground">
                                            {currentSlide + 1} of {totalSlides}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Divider - Only show if there are experiences */}
                        {experiences.length > 0 && (
                            <div className="my-6 md:my-8 border-t border-border"></div>
                        )}

                        {/* Add button */}
                        <button
                            onClick={handleAddExperience}
                            className="w-full max-w-md border-2 border-dashed border-border rounded-xl md:rounded-2xl p-6 md:p-12 hover:border-primary hover:bg-primary/10 transition-all duration-300 group mx-auto block"
                        >
                            <div className="flex items-center gap-3 text-muted-foreground group-hover:text-primary justify-center">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center">
                                    <Plus className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                                </div>
                                <span className="text-base md:text-lg font-semibold">Add experience</span>
                            </div>
                        </button>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleBack}
                            className="px-4 py-2 md:px-6 md:py-3 text-muted-foreground font-medium rounded-lg md:rounded-xl hover:bg-background hover:text-foreground transition-all duration-300 flex items-center gap-2 border border-border backdrop-blur-sm text-sm md:text-base"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={onSkip}
                                className="px-4 py-2 md:px-5 md:py-3 text-muted-foreground font-medium hover:text-foreground transition-colors duration-300 text-sm md:text-base"
                            >
                                Skip for now
                            </button>
                            <button
                                onClick={handleNext}
                                className={`px-5 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 text-sm md:text-base ${
                                    'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-primary-foreground shadow-medium hover:shadow-large'
                                }`}
                            >
                                Next, add your education
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Experience Modal */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
                    <div className={`bg-card backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-8 w-full max-w-2xl shadow-large relative max-h-[90vh] overflow-y-auto transition-all duration-500 ${
                        isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}>
                        <button
                            onClick={handleCloseForm}
                            className="absolute top-3 right-3 p-2 hover:bg-muted rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-muted-foreground" />
                        </button>

                        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">
                            {editingExperienceId ? "Edit Work Experience" : "Add Work Experience"}
                        </h2>

                        <div className="space-y-4 md:space-y-5">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    placeholder="e.g., Software Engineer"
                                    className="w-full border-2 border-input rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none transition-colors bg-background/50 backdrop-blur-sm"
                                />
                            </div>

                            {/* Company */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Company *
                                </label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) =>
                                        setFormData({ ...formData, company: e.target.value })
                                    }
                                    placeholder="e.g., Google"
                                    className="w-full border-2 border-input rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none transition-colors bg-background/50 backdrop-blur-sm"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., San Francisco, CA"
                                    value={formData.location}
                                    onChange={(e) =>
                                        setFormData({ ...formData, location: e.target.value })
                                    }
                                    className="w-full border-2 border-input rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none transition-colors bg-background/50 backdrop-blur-sm"
                                />
                            </div>

                            {/* Checkbox */}
                            <div className="flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    checked={formData.current}
                                    onChange={(e) =>
                                        setFormData({ ...formData, current: e.target.checked })
                                    }
                                    className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
                                />
                                <label className="text-sm text-foreground">
                                    I am currently working in this role
                                </label>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Start Date */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Start Date *
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            value={formData.startMonth}
                                            onChange={(e) =>
                                                setFormData({ ...formData, startMonth: e.target.value })
                                            }
                                            className="w-1/2 border-2 border-input rounded-lg px-3 py-2 text-sm bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none transition-colors"
                                        >
                                            <option value="">Month</option>
                                            {months.map((m) => (
                                                <option key={m} value={m}>
                                                    {m}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={formData.startYear}
                                            onChange={(e) =>
                                                setFormData({ ...formData, startYear: e.target.value })
                                            }
                                            className="w-1/2 border-2 border-input rounded-lg px-3 py-2 text-sm bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none transition-colors"
                                        >
                                            <option value="">Year</option>
                                            {years.map((y) => (
                                                <option key={y} value={y}>
                                                    {y}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* End Date */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        End Date {!formData.current && '*'}
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            disabled={formData.current}
                                            value={formData.endMonth}
                                            onChange={(e) =>
                                                setFormData({ ...formData, endMonth: e.target.value })
                                            }
                                            className="w-1/2 border-2 border-input rounded-lg px-3 py-2 text-sm bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none transition-colors disabled:bg-muted/50"
                                        >
                                            <option value="">Month</option>
                                            {months.map((m) => (
                                                <option key={m} value={m}>
                                                    {m}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            disabled={formData.current}
                                            value={formData.endYear}
                                            onChange={(e) =>
                                                setFormData({ ...formData, endYear: e.target.value })
                                            }
                                            className="w-1/2 border-2 border-input rounded-lg px-3 py-2 text-sm bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none transition-colors disabled:bg-muted/50"
                                        >
                                            <option value="">Year</option>
                                            {years.map((y) => (
                                                <option key={y} value={y}>
                                                    {y}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Description
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    placeholder="Describe your work, responsibilities, and achievements..."
                                    className="w-full border-2 border-input rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none transition-colors bg-background/50 backdrop-blur-sm"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={handleCloseForm}
                                    className="px-4 py-2 border-2 border-input rounded-lg text-muted-foreground font-medium hover:bg-muted transition-colors text-sm md:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveExperience}
                                    disabled={!formData.title || !formData.company || !formData.startMonth || !formData.startYear || (!formData.current && (!formData.endMonth || !formData.endYear))}
                                    className="px-5 py-2 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground font-medium rounded-lg hover:from-primary-light hover:to-primary disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-all duration-300 text-sm md:text-base"
                                >
                                    {editingExperienceId ? "Update" : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && experienceToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
                    <div className={`bg-card backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-8 w-full max-w-md shadow-large relative transition-all duration-500 ${
                        isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}>
                        <button
                            onClick={handleCancelDelete}
                            className="absolute top-3 right-3 p-2 hover:bg-muted rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-muted-foreground" />
                        </button>

                        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                            Remove Work Experience
                        </h2>

                        <p className="text-foreground/80 mb-4 md:mb-6">
                            Are you sure you want to remove '{experienceToDelete.company}'
                        </p>

                        <p className="text-muted-foreground text-sm mb-6 md:mb-8">
                            from your profile?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 border-2 border-input rounded-lg text-muted-foreground font-medium hover:bg-muted transition-colors text-sm md:text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-5 py-2 bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground font-medium rounded-lg hover:from-destructive hover:to-destructive transition-all duration-300 text-sm md:text-base"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add CSS for animations */}
            <style jsx>{`
                @keyframes checkmark {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                
                .animate-checkmark {
                    animation: checkmark 0.5s ease-in-out;
                }
                
                .animate-in {
                    animation: enter 0.3s ease-out;
                }
                
                @keyframes enter {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default ExperienceStep;