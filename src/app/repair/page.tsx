"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Textarea,
  Label,
  RadioGroup,
  RadioGroupItem,
  Smartphone,
  Tablet,
  Laptop,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Stethoscope,
  CheckCircle,
  Wrench,
} from "@/components/ui";

// EmailJS integration
const sendEmail = async (formData: {
  name: string;
  phone: string;
  email: string;
  address: string;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  issue: string;
  pickupTime: string;
  orderId: string;
}) => {
  try {
    // Send email to business
    await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "shawnjangle@gmail.com",
        subject: "New Repair Request - Doctor Device VA",
        html: `
          <h2>New Repair Request</h2>
          <p><strong>Customer Name:</strong> ${formData.name}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Address:</strong> ${formData.address}</p>
          <p><strong>Device:</strong> ${formData.deviceBrand} ${
          formData.deviceType
        } ${formData.deviceModel ? `(${formData.deviceModel})` : ""}</p>
          <p><strong>Issue:</strong> ${formData.issue}</p>
          <p><strong>Pickup Time:</strong> ${formData.pickupTime}</p>
          <p><strong>Order ID:</strong> ${formData.orderId}</p>
        `,
      }),
    });

    // Send confirmation email to customer
    await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: formData.email,
        subject: "Repair Request Confirmed - Doctor Device VA",
        html: `
          <h2>Thank you for choosing Doctor Device VA!</h2>
          <p>Your repair request has been received and confirmed.</p>
          <h3>Order Details:</h3>
          <p><strong>Order ID:</strong> ${formData.orderId}</p>
          <p><strong>Device:</strong> ${formData.deviceBrand} ${
          formData.deviceType
        } ${formData.deviceModel ? `(${formData.deviceModel})` : ""}</p>
          <p><strong>Issue:</strong> ${formData.issue}</p>
          <p><strong>Scheduled Pickup:</strong> ${formData.pickupTime}</p>
          <p><strong>Pickup Address:</strong> ${formData.address}</p>
          <h3>What's Next?</h3>
          <p>We&apos;ll contact you within 30 minutes to confirm your appointment and provide a more specific pickup time.</p>
          <p>If you have any questions, please call us at (555) 123-TECH or email hello@drdeviceva.com</p>
          <p>Thank you for choosing Doctor Device VA!</p>
        `,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

export default function RepairPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [deviceType, setDeviceType] = useState("");
  const [deviceBrand, setDeviceBrand] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [issue, setIssue] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [pickupTime, setPickupTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Handle URL parameters for auto-fill
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const deviceTypeParam = urlParams.get("deviceType");
      const nameParam = urlParams.get("name");
      const phoneParam = urlParams.get("phone");
      const emailParam = urlParams.get("email");
      const addressParam = urlParams.get("address");
      const issueParam = urlParams.get("issue");

      if (deviceTypeParam) {
        setDeviceType(deviceTypeParam);
        // If device type is set, skip to step 2
        setCurrentStep(2);
      }
      if (nameParam) setContactInfo((prev) => ({ ...prev, name: nameParam }));
      if (phoneParam)
        setContactInfo((prev) => ({ ...prev, phone: phoneParam }));
      if (emailParam)
        setContactInfo((prev) => ({ ...prev, email: emailParam }));
      if (addressParam)
        setContactInfo((prev) => ({ ...prev, address: addressParam }));
      if (issueParam) setIssue(issueParam);
    }
  }, []);

  // Generate order ID on component mount
  useEffect(() => {
    const generateOrderId = () => {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.random().toString(36).substring(2, 8).toUpperCase();
      return `DR${timestamp}${random}`;
    };
    setOrderId(generateOrderId());
  }, []);

  const deviceIcons = {
    phone: Smartphone,
    tablet: Tablet,
    computer: Laptop,
  };

  const deviceBrands = {
    phone: ["Apple", "Samsung", "Google", "OnePlus", "Not Sure"],
    tablet: ["Apple", "Samsung", "Microsoft", "Amazon", "Not Sure"],
    computer: ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Not Sure"],
  };

  const commonIssues = {
    phone: [
      "Cracked Screen",
      "Battery Issues",
      "Water Damage",
      "Charging Problems",
      "Not Sure",
    ],
    tablet: [
      "Cracked Screen",
      "Battery Issues",
      "Charging Port",
      "Software Issues",
      "Not Sure",
    ],
    computer: [
      "Screen Issues",
      "Keyboard Problems",
      "Won't Turn On",
      "Running Slow",
      "Not Sure",
    ],
  };

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const DeviceIcon = deviceType
    ? deviceIcons[deviceType as keyof typeof deviceIcons]
    : Smartphone;

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const formData = {
      ...contactInfo,
      deviceType,
      deviceBrand,
      deviceModel,
      issue,
      pickupTime,
      orderId,
    };

    const result = await sendEmail(formData);

    if (result.success) {
      setSubmitSuccess(true);
    } else {
      console.error("Failed to send email");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground font-serif">
              Doctor Device VA
            </span>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentStep} of 4
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round((currentStep / 4) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-serif text-green-600">
                Request Submitted Successfully!
              </CardTitle>
              <CardDescription className="mt-4">
                Order ID: {orderId}
              </CardDescription>
              <p className="text-muted-foreground mt-4">
                We&apos;ve sent you a confirmation email. We&apos;ll contact you
                within 30 minutes to confirm your appointment.
              </p>
              <Button
                onClick={() => (window.location.href = "/")}
                className="mt-6 bg-primary hover:bg-primary/90"
              >
                Return to Home
              </Button>
            </Card>
          )}

          {/* Step 1: Device Selection */}
          {currentStep === 1 && !submitSuccess && (
            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DeviceIcon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-serif">
                  What device needs repair?
                </CardTitle>
                <CardDescription>
                  Select the type of device you&apos;d like us to fix
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={deviceType}
                  onValueChange={setDeviceType}
                  className="space-y-4"
                >
                  <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem
                      value="phone"
                      id="phone"
                      checked={deviceType === "phone"}
                      onChange={(e) => setDeviceType(e.target.value)}
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <Smartphone className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Smartphone</div>
                        <div className="text-sm text-muted-foreground">
                          iPhone, Samsung, Google Pixel & more
                        </div>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem
                      value="tablet"
                      id="tablet"
                      checked={deviceType === "tablet"}
                      onChange={(e) => setDeviceType(e.target.value)}
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <Tablet className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Tablet</div>
                        <div className="text-sm text-muted-foreground">
                          iPad, Samsung Galaxy Tab & more
                        </div>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem
                      value="computer"
                      id="computer"
                      checked={deviceType === "computer"}
                      onChange={(e) => setDeviceType(e.target.value)}
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <Laptop className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Computer</div>
                        <div className="text-sm text-muted-foreground">
                          MacBook, Windows laptops & desktops
                        </div>
                      </div>
                    </div>
                  </label>
                </RadioGroup>
                <Button
                  onClick={handleNext}
                  disabled={!deviceType}
                  className="w-full mt-6 bg-primary hover:bg-primary/90"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Device Details */}
          {currentStep === 2 && !submitSuccess && (
            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DeviceIcon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-serif">
                  Tell us about your {deviceType}
                </CardTitle>
                <CardDescription>
                  Help us identify your specific device
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Device Brand</Label>
                  <RadioGroup
                    value={deviceBrand}
                    onValueChange={setDeviceBrand}
                    className="grid grid-cols-2 gap-3"
                  >
                    {deviceBrands[deviceType as keyof typeof deviceBrands]?.map(
                      (brand) => (
                        <label
                          key={brand}
                          className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        >
                          <RadioGroupItem
                            value={brand}
                            id={brand}
                            checked={deviceBrand === brand}
                            onChange={(e) => setDeviceBrand(e.target.value)}
                          />
                          <span className="cursor-pointer flex-1 text-sm">
                            {brand}
                          </span>
                        </label>
                      )
                    )}
                  </RadioGroup>
                </div>

                {deviceBrand && deviceBrand !== "Not Sure" && (
                  <div className="space-y-3">
                    <Label htmlFor="model" className="text-sm font-medium">
                      Device Model (Optional)
                    </Label>
                    <Input
                      id="model"
                      placeholder={`e.g., ${
                        deviceBrand === "Apple"
                          ? "iPhone 14 Pro"
                          : deviceBrand === "Samsung"
                          ? "Galaxy S23"
                          : "Model name"
                      }`}
                      value={deviceModel}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDeviceModel(e.target.value)
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Don&apos;t worry if you&apos;re not sure - we can identify
                      it during pickup
                    </p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!deviceBrand}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Issue Description */}
          {currentStep === 3 && !submitSuccess && (
            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DeviceIcon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-serif">
                  What&apos;s wrong with your device?
                </CardTitle>
                <CardDescription>
                  Select the issue that best describes your problem
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Common Issues</Label>
                  <RadioGroup
                    value={issue}
                    onValueChange={setIssue}
                    className="space-y-3"
                  >
                    {commonIssues[deviceType as keyof typeof commonIssues]?.map(
                      (issueOption) => (
                        <label
                          key={issueOption}
                          className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        >
                          <RadioGroupItem
                            value={issueOption}
                            id={issueOption}
                            checked={issue === issueOption}
                            onChange={(e) => setIssue(e.target.value)}
                          />
                          <span className="cursor-pointer flex-1">
                            {issueOption}
                          </span>
                        </label>
                      )
                    )}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="details" className="text-sm font-medium">
                    Additional Details (Optional)
                  </Label>
                  <Textarea
                    id="details"
                    placeholder="Describe any additional symptoms or details about the problem..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!issue}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Contact & Pickup */}
          {currentStep === 4 && !submitSuccess && (
            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-serif">
                  Schedule Your Pickup
                </CardTitle>
                <CardDescription>
                  We&apos;ll contact you to confirm the appointment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={contactInfo.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setContactInfo({ ...contactInfo, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      placeholder="(555) 123-4567"
                      value={contactInfo.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setContactInfo({
                          ...contactInfo,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={contactInfo.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setContactInfo({ ...contactInfo, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Pickup Address *
                  </Label>
                  <Input
                    id="address"
                    placeholder="Street address"
                    value={contactInfo.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setContactInfo({
                        ...contactInfo,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Preferred Pickup Time
                  </Label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Available Monday-Thursday & Saturday-Sunday, 9AM-5PM
                  </p>
                  <RadioGroup
                    value={pickupTime}
                    onValueChange={setPickupTime}
                    className="grid grid-cols-2 gap-3"
                  >
                    {timeSlots.map((slot) => (
                      <label
                        key={slot}
                        className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      >
                        <RadioGroupItem
                          value={slot}
                          id={slot}
                          checked={pickupTime === slot}
                          onChange={(e) => setPickupTime(e.target.value)}
                        />
                        <span className="cursor-pointer flex-1 text-sm">
                          {slot}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Wrench className="w-4 h-4 text-primary mr-2" />
                    Order Summary
                  </h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>
                      Device: {deviceBrand} {deviceType}{" "}
                      {deviceModel && `(${deviceModel})`}
                    </p>
                    <p>Issue: {issue}</p>
                    <p>Pickup: FREE</p>
                    <p>Diagnostic: FREE</p>
                    <p>Order ID: {orderId}</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      !contactInfo.name ||
                      !contactInfo.phone ||
                      !contactInfo.email ||
                      !contactInfo.address ||
                      isSubmitting
                    }
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      "Scheduling..."
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Pickup
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
