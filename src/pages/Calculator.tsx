
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Check, AlertCircle, Car, Train, Plane, Bike, Bus, Coffee, ShoppingBag, Lightbulb, Home } from 'lucide-react';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import { useToast } from '@/components/ui/use-toast';

const Calculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('transportation');
  const [submitting, setSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [carbonResult, setCarbonResult] = useState(0);

  // Form state
  const [transportation, setTransportation] = useState({
    carType: 'gasoline',
    carDistance: 20,
    publicTransport: 'bus',
    publicDistance: 5,
    flightHours: 0,
  });

  const [food, setFood] = useState({
    meatConsumption: 'medium',
    dairyConsumption: 'medium',
    localFood: 50,
    organicFood: 30,
  });

  const [energy, setEnergy] = useState({
    electricitySource: 'mixed',
    electricityUsage: 300,
    heatingType: 'natural_gas',
    heatingUsage: 150,
  });

  const [lifestyle, setLifestyle] = useState({
    shoppingFrequency: 'moderate',
    electronicUsage: 'moderate',
    wasteRecycling: 60,
  });

  const calculateCarbonFootprint = () => {
    setSubmitting(true);
    
    // This is a simplified mock calculation
    // In a real app, this would be based on actual carbon emission factors
    let total = 0;
    
    // Transportation calculation
    if (transportation.carType === 'gasoline') {
      total += transportation.carDistance * 0.2; // kg CO2 per km
    } else if (transportation.carType === 'hybrid') {
      total += transportation.carDistance * 0.1;
    } else if (transportation.carType === 'electric') {
      total += transportation.carDistance * 0.05;
    }
    
    if (transportation.publicTransport === 'bus') {
      total += transportation.publicDistance * 0.1;
    } else if (transportation.publicTransport === 'train') {
      total += transportation.publicDistance * 0.05;
    } else if (transportation.publicTransport === 'subway') {
      total += transportation.publicDistance * 0.03;
    }
    
    total += transportation.flightHours * 200; // Average emissions per hour of flight
    
    // Food calculation
    if (food.meatConsumption === 'high') {
      total += 30;
    } else if (food.meatConsumption === 'medium') {
      total += 20;
    } else if (food.meatConsumption === 'low') {
      total += 10;
    } else if (food.meatConsumption === 'none') {
      total += 5;
    }
    
    // Adjust for local and organic food
    total = total * (1 - (food.localFood / 200)) * (1 - (food.organicFood / 200));
    
    // Energy calculation
    if (energy.electricitySource === 'fossil') {
      total += energy.electricityUsage * 0.5;
    } else if (energy.electricitySource === 'mixed') {
      total += energy.electricityUsage * 0.3;
    } else if (energy.electricitySource === 'renewable') {
      total += energy.electricityUsage * 0.1;
    }
    
    if (energy.heatingType === 'natural_gas') {
      total += energy.heatingUsage * 0.2;
    } else if (energy.heatingType === 'oil') {
      total += energy.heatingUsage * 0.3;
    } else if (energy.heatingType === 'electric') {
      total += energy.heatingUsage * 0.15;
    } else if (energy.heatingType === 'renewable') {
      total += energy.heatingUsage * 0.05;
    }
    
    // Lifestyle calculation
    if (lifestyle.shoppingFrequency === 'frequent') {
      total += 30;
    } else if (lifestyle.shoppingFrequency === 'moderate') {
      total += 20;
    } else if (lifestyle.shoppingFrequency === 'minimal') {
      total += 10;
    }
    
    // Adjust for recycling
    total = total * (1 - (lifestyle.wasteRecycling / 200));
    
    // Round to 2 decimal places
    total = Math.round(total * 100) / 100;
    
    setTimeout(() => {
      setCarbonResult(total);
      setShowResults(true);
      setSubmitting(false);
      
      toast({
        title: "Calculation Complete",
        description: "Your carbon footprint has been calculated successfully.",
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCarbonFootprint();
  };

  const handleReset = () => {
    setShowResults(false);
    setCarbonResult(0);
    // Reset form fields to defaults if needed
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-earthwise-neutral-dark">Carbon Footprint Calculator</h1>
            <p className="text-earthwise-neutral max-w-2xl mx-auto mt-2">
              Track your carbon emissions by providing information about your daily activities and lifestyle.
            </p>
          </div>

          {!showResults ? (
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Enter your information</CardTitle>
                  <CardDescription>
                    Fill out the details below to calculate your carbon footprint. Be as accurate as possible for better results.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid grid-cols-4 mb-8">
                        <TabsTrigger value="transportation" className="flex items-center">
                          <Car className="mr-2 h-4 w-4" /> Transportation
                        </TabsTrigger>
                        <TabsTrigger value="food" className="flex items-center">
                          <Coffee className="mr-2 h-4 w-4" /> Food
                        </TabsTrigger>
                        <TabsTrigger value="energy" className="flex items-center">
                          <Lightbulb className="mr-2 h-4 w-4" /> Energy
                        </TabsTrigger>
                        <TabsTrigger value="lifestyle" className="flex items-center">
                          <ShoppingBag className="mr-2 h-4 w-4" /> Lifestyle
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="transportation" className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label>What type of car do you drive?</Label>
                            <RadioGroup 
                              value={transportation.carType}
                              onValueChange={(value) => setTransportation({...transportation, carType: value})}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="gasoline" id="gasoline" />
                                <Label htmlFor="gasoline">Gasoline/Diesel</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="hybrid" id="hybrid" />
                                <Label htmlFor="hybrid">Hybrid</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="electric" id="electric" />
                                <Label htmlFor="electric">Electric</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label>Average daily car travel (km)</Label>
                            <div className="flex items-center space-x-4 mt-2">
                              <Slider 
                                value={[transportation.carDistance]} 
                                min={0} 
                                max={100} 
                                step={1}
                                onValueChange={(value) => setTransportation({...transportation, carDistance: value[0]})}
                                className="flex-grow"
                              />
                              <span className="w-12 text-center">{transportation.carDistance}</span>
                            </div>
                          </div>

                          <div>
                            <Label>Public transportation type</Label>
                            <Select 
                              value={transportation.publicTransport}
                              onValueChange={(value) => setTransportation({...transportation, publicTransport: value})}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select transport type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bus">Bus</SelectItem>
                                <SelectItem value="train">Train</SelectItem>
                                <SelectItem value="subway">Subway/Metro</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Average daily public transport travel (km)</Label>
                            <div className="flex items-center space-x-4 mt-2">
                              <Slider 
                                value={[transportation.publicDistance]} 
                                min={0} 
                                max={50} 
                                step={1}
                                onValueChange={(value) => setTransportation({...transportation, publicDistance: value[0]})}
                                className="flex-grow"
                              />
                              <span className="w-12 text-center">{transportation.publicDistance}</span>
                            </div>
                          </div>

                          <div>
                            <Label>Flight hours per month</Label>
                            <div className="flex items-center space-x-4 mt-2">
                              <Slider 
                                value={[transportation.flightHours]} 
                                min={0} 
                                max={20} 
                                step={0.5}
                                onValueChange={(value) => setTransportation({...transportation, flightHours: value[0]})}
                                className="flex-grow"
                              />
                              <span className="w-12 text-center">{transportation.flightHours}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button 
                            type="button" 
                            onClick={() => setActiveTab('food')}
                            className="bg-earthwise-green hover:bg-earthwise-green-dark"
                          >
                            Next: Food
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="food" className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label>Meat consumption</Label>
                            <RadioGroup 
                              value={food.meatConsumption}
                              onValueChange={(value) => setFood({...food, meatConsumption: value})}
                              className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="high" id="meat-high" />
                                <Label htmlFor="meat-high">High (Daily)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="medium" id="meat-medium" />
                                <Label htmlFor="meat-medium">Medium (Few times a week)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="low" id="meat-low" />
                                <Label htmlFor="meat-low">Low (Once a week or less)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="none" id="meat-none" />
                                <Label htmlFor="meat-none">None (Vegetarian/Vegan)</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label>Percentage of locally sourced food (%)</Label>
                            <div className="flex items-center space-x-4 mt-2">
                              <Slider 
                                value={[food.localFood]} 
                                min={0} 
                                max={100} 
                                step={5}
                                onValueChange={(value) => setFood({...food, localFood: value[0]})}
                                className="flex-grow"
                              />
                              <span className="w-12 text-center">{food.localFood}%</span>
                            </div>
                          </div>

                          <div>
                            <Label>Percentage of organic/sustainable food (%)</Label>
                            <div className="flex items-center space-x-4 mt-2">
                              <Slider 
                                value={[food.organicFood]} 
                                min={0} 
                                max={100} 
                                step={5}
                                onValueChange={(value) => setFood({...food, organicFood: value[0]})}
                                className="flex-grow"
                              />
                              <span className="w-12 text-center">{food.organicFood}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setActiveTab('transportation')}
                          >
                            Back
                          </Button>
                          <Button 
                            type="button" 
                            onClick={() => setActiveTab('energy')}
                            className="bg-earthwise-green hover:bg-earthwise-green-dark"
                          >
                            Next: Energy
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="energy" className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label>Electricity source</Label>
                            <RadioGroup 
                              value={energy.electricitySource}
                              onValueChange={(value) => setEnergy({...energy, electricitySource: value})}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="fossil" id="fossil" />
                                <Label htmlFor="fossil">Mainly Fossil Fuels</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="mixed" id="mixed" />
                                <Label htmlFor="mixed">Mixed Sources</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="renewable" id="renewable" />
                                <Label htmlFor="renewable">Renewable Energy</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label>Monthly electricity usage (kWh)</Label>
                            <div className="flex items-center space-x-4 mt-2">
                              <Slider 
                                value={[energy.electricityUsage]} 
                                min={0} 
                                max={1000} 
                                step={10}
                                onValueChange={(value) => setEnergy({...energy, electricityUsage: value[0]})}
                                className="flex-grow"
                              />
                              <span className="w-16 text-center">{energy.electricityUsage}</span>
                            </div>
                          </div>

                          <div>
                            <Label>Heating type</Label>
                            <Select 
                              value={energy.heatingType}
                              onValueChange={(value) => setEnergy({...energy, heatingType: value})}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select heating type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="natural_gas">Natural Gas</SelectItem>
                                <SelectItem value="oil">Oil</SelectItem>
                                <SelectItem value="electric">Electric</SelectItem>
                                <SelectItem value="renewable">Renewable</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Monthly heating usage (units)</Label>
                            <div className="flex items-center space-x-4 mt-2">
                              <Slider 
                                value={[energy.heatingUsage]} 
                                min={0} 
                                max={500} 
                                step={10}
                                onValueChange={(value) => setEnergy({...energy, heatingUsage: value[0]})}
                                className="flex-grow"
                              />
                              <span className="w-16 text-center">{energy.heatingUsage}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setActiveTab('food')}
                          >
                            Back
                          </Button>
                          <Button 
                            type="button" 
                            onClick={() => setActiveTab('lifestyle')}
                            className="bg-earthwise-green hover:bg-earthwise-green-dark"
                          >
                            Next: Lifestyle
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="lifestyle" className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label>Shopping frequency for non-essentials</Label>
                            <RadioGroup 
                              value={lifestyle.shoppingFrequency}
                              onValueChange={(value) => setLifestyle({...lifestyle, shoppingFrequency: value})}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="frequent" id="shopping-frequent" />
                                <Label htmlFor="shopping-frequent">Frequent (Weekly)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="moderate" id="shopping-moderate" />
                                <Label htmlFor="shopping-moderate">Moderate (Monthly)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="minimal" id="shopping-minimal" />
                                <Label htmlFor="shopping-minimal">Minimal (Few times a year)</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label>Electronic device usage</Label>
                            <RadioGroup 
                              value={lifestyle.electronicUsage}
                              onValueChange={(value) => setLifestyle({...lifestyle, electronicUsage: value})}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="high" id="electronics-high" />
                                <Label htmlFor="electronics-high">Heavy (Many devices, long hours)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="moderate" id="electronics-moderate" />
                                <Label htmlFor="electronics-moderate">Moderate</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="low" id="electronics-low" />
                                <Label htmlFor="electronics-low">Light (Few devices, short usage)</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label>Percentage of waste recycled (%)</Label>
                            <div className="flex items-center space-x-4 mt-2">
                              <Slider 
                                value={[lifestyle.wasteRecycling]} 
                                min={0} 
                                max={100} 
                                step={5}
                                onValueChange={(value) => setLifestyle({...lifestyle, wasteRecycling: value[0]})}
                                className="flex-grow"
                              />
                              <span className="w-12 text-center">{lifestyle.wasteRecycling}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setActiveTab('energy')}
                          >
                            Back
                          </Button>
                          <Button 
                            type="submit"
                            className="bg-earthwise-green hover:bg-earthwise-green-dark"
                            disabled={submitting}
                          >
                            {submitting ? 'Calculating...' : 'Calculate My Footprint'}
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </form>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Your Carbon Footprint Results</CardTitle>
                  <CardDescription>
                    Based on the information you provided, here's your estimated carbon footprint.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-8">
                    <div className="text-5xl font-bold text-earthwise-green-dark mb-2">
                      {carbonResult} kg CO₂e
                    </div>
                    <p className="text-lg text-earthwise-neutral">per month</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Car className="mr-2 h-5 w-5 text-earthwise-green" />
                        Transportation Impact
                      </h3>
                      <p className="mb-2">Your car usage contributes approximately <strong>{(transportation.carDistance * (transportation.carType === 'gasoline' ? 0.2 : transportation.carType === 'hybrid' ? 0.1 : 0.05)).toFixed(1)} kg CO₂e</strong> per day.</p>
                      <p>Your monthly flights contribute approximately <strong>{(transportation.flightHours * 200).toFixed(1)} kg CO₂e</strong>.</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Coffee className="mr-2 h-5 w-5 text-earthwise-green" />
                        Food Impact
                      </h3>
                      <p className="mb-2">Your diet contributes approximately <strong>{(food.meatConsumption === 'high' ? 30 : food.meatConsumption === 'medium' ? 20 : food.meatConsumption === 'low' ? 10 : 5).toFixed(1)} kg CO₂e</strong> per month.</p>
                      <p>By buying {food.localFood}% local food, you're reducing your food footprint by about <strong>{(food.localFood / 2).toFixed(1)}%</strong>.</p>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Recommended Green Alternatives</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {transportation.carType === 'gasoline' && (
                        <div className="flex p-4 bg-earthwise-green/10 rounded-lg">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 bg-earthwise-green rounded-full flex items-center justify-center">
                              <Car className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Consider a hybrid or electric vehicle</h4>
                            <p className="text-sm text-earthwise-neutral-dark">
                              Switching to an electric vehicle could reduce your transportation emissions by up to 75%.
                            </p>
                          </div>
                        </div>
                      )}

                      {transportation.publicDistance < 10 && (
                        <div className="flex p-4 bg-earthwise-green/10 rounded-lg">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 bg-earthwise-green rounded-full flex items-center justify-center">
                              <Train className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Increase public transportation usage</h4>
                            <p className="text-sm text-earthwise-neutral-dark">
                              Using public transportation more frequently can significantly reduce your carbon footprint.
                            </p>
                          </div>
                        </div>
                      )}

                      {food.meatConsumption === 'high' && (
                        <div className="flex p-4 bg-earthwise-green/10 rounded-lg">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 bg-earthwise-green rounded-full flex items-center justify-center">
                              <Coffee className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Try meatless Mondays</h4>
                            <p className="text-sm text-earthwise-neutral-dark">
                              Reducing meat consumption by even one day per week can lower your food-related emissions by up to 15%.
                            </p>
                          </div>
                        </div>
                      )}

                      {energy.electricitySource !== 'renewable' && (
                        <div className="flex p-4 bg-earthwise-green/10 rounded-lg">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 bg-earthwise-green rounded-full flex items-center justify-center">
                              <Lightbulb className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Switch to renewable energy</h4>
                            <p className="text-sm text-earthwise-neutral-dark">
                              Changing to a renewable energy provider could reduce your electricity emissions by up to 80%.
                            </p>
                          </div>
                        </div>
                      )}

                      {lifestyle.wasteRecycling < 50 && (
                        <div className="flex p-4 bg-earthwise-green/10 rounded-lg">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 bg-earthwise-green rounded-full flex items-center justify-center">
                              <Home className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Increase recycling</h4>
                            <p className="text-sm text-earthwise-neutral-dark">
                              Improving your recycling habits can reduce your waste-related emissions and help conserve resources.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                  >
                    Calculate Again
                  </Button>
                  <Button 
                    className="bg-earthwise-green hover:bg-earthwise-green-dark"
                    asChild
                  >
                    <Link to="/dashboard">View Dashboard</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Calculator;


// // import React, { useState } from 'react';
// // import './styles.css';

// // const CarbonCalculator = () => {
// //   const [formData, setFormData] = useState({
// //     Sex: 'male',
// //     BodyType: 'normal',
// //     Diet: 'omnivore',
// //     HowOftenShower: 'daily',
// //     HeatingEnergySource: 'coal',
// //     Transport: 'private',
// //     VehicleType: 'diesel',
// //     WasteBagSize: 'medium',
// //     SocialActivity: 'never',
// //     FrequencyOfTravelingByAir: 'never',
// //     EnergyEfficiency: 'No',
// //     WasteBagWeeklyCount: 2,
// //     MonthlyGroceryBill: 300,
// //     VehicleMonthlyDistanceKm: 0,
// //     HowLongTVPCDailyHour: 4,
// //     HowLongInternetDailyHour: 3,
// //     HowManyNewClothesMonthly: 5,
// //     recycledMaterials: ['Paper'],
// //     cookingAppliances: ['Stove'],
// //   });

// //   const [showResults, setShowResults] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [result, setResult] = useState({ value: 0, category: 'Low', tips: [] });

// //   const handleChange = (e) => {
// //     const { name, value, type } = e.target;
// //     if (type === 'number') {
// //       setFormData({ ...formData, [name]: parseInt(value) });
// //     } else {
// //       setFormData({ ...formData, [name]: value });
// //     }
// //   };

// //   const handleCheckboxChange = (e, group) => {
// //     const value = e.target.value;
// //     const current = formData[group];
// //     if (e.target.checked) {
// //       setFormData({ ...formData, [group]: [...current, value] });
// //     } else {
// //       setFormData({ ...formData, [group]: current.filter((item) => item !== value) });
// //     }
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');
// //     setShowResults(false);

// //     // Fake calculation delay
// //     setTimeout(() => {
// //       const total = Math.floor(Math.random() * 5000);
// //       let category = 'Low';
// //       if (total >= 1000 && total <= 3000) category = 'Average';
// //       else if (total > 3000) category = 'High';

// //       const tips = [
// //         'Use public transport more often.',
// //         'Consider reducing meat consumption.',
// //         'Switch to energy-efficient appliances.',
// //         'Recycle more materials regularly.',
// //       ];

// //       setResult({ value: total, category, tips: tips.slice(0, 3) });
// //       setLoading(false);
// //       setShowResults(true);
// //     }, 1500);
// //   };

// //   return (
// //     <div className="container">
// //       <header>
// //         <h1>🌍 EcoSwitch: Carbon Emission Calculator</h1>
// //         <p>Estimate your carbon footprint and get personalized eco-advice</p>
// //       </header>

// //       <form onSubmit={handleSubmit}>
// //         {/* Personal Information */}
// //         <section className="form-section">
// //           <h2>Personal Information</h2>
// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Gender</label>
// //               <select name="Sex" value={formData.Sex} onChange={handleChange} required>
// //                 <option value="male">Male</option>
// //                 <option value="female">Female</option>
// //               </select>
// //               <small>Biological sex for metabolic calculations</small>
// //             </div>
// //             <div className="form-group">
// //               <label>Body Type</label>
// //               <select name="BodyType" value={formData.BodyType} onChange={handleChange} required>
// //                 <option value="normal">Normal</option>
// //                 <option value="obese">Obese</option>
// //                 <option value="overweight">Overweight</option>
// //                 <option value="underweight">Underweight</option>
// //               </select>
// //             </div>
// //           </div>

// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Diet</label>
// //               <select name="Diet" value={formData.Diet} onChange={handleChange} required>
// //                 <option value="omnivore">Omnivore</option>
// //                 <option value="pescatarian">Pescatarian</option>
// //                 <option value="vegan">Vegan</option>
// //                 <option value="vegetarian">Vegetarian</option>
// //               </select>
// //             </div>
// //             <div className="form-group">
// //               <label>Shower Frequency</label>
// //               <select name="HowOftenShower" value={formData.HowOftenShower} onChange={handleChange} required>
// //                 <option value="daily">Daily</option>
// //                 <option value="less frequently">Less Frequently</option>
// //                 <option value="more frequently">More Frequently</option>
// //                 <option value="twice a day">Twice a Day</option>
// //               </select>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Living Situation */}
// //         <section className="form-section">
// //           <h2>Living Situation</h2>
// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Home Heating Source</label>
// //               <select name="HeatingEnergySource" value={formData.HeatingEnergySource} onChange={handleChange} required>
// //                 <option value="coal">Coal</option>
// //                 <option value="electricity">Electricity</option>
// //                 <option value="natural gas">Natural Gas</option>
// //                 <option value="wood">Wood</option>
// //               </select>
// //             </div>
// //             <div className="form-group">
// //               <label>Primary Transportation</label>
// //               <select name="Transport" value={formData.Transport} onChange={handleChange} required>
// //                 <option value="private">Private</option>
// //                 <option value="public">Public</option>
// //                 <option value="walk/bicycle">Walk/Bicycle</option>
// //               </select>
// //             </div>
// //           </div>

// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Vehicle Fuel Type</label>
// //               <select name="VehicleType" value={formData.VehicleType} onChange={handleChange}>
// //                 <option value="diesel">Diesel</option>
// //                 <option value="electric">Electric</option>
// //                 <option value="hybrid">Hybrid</option>
// //                 <option value="lpg">LPG</option>
// //                 <option value="petrol">Petrol</option>
// //               </select>
// //             </div>
// //             <div className="form-group">
// //               <label>Typical Waste Bag Size</label>
// //               <select name="WasteBagSize" value={formData.WasteBagSize} onChange={handleChange} required>
// //                 <option value="extra large">Extra Large</option>
// //                 <option value="large">Large</option>
// //                 <option value="medium">Medium</option>
// //                 <option value="small">Small</option>
// //               </select>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Lifestyle Habits */}
// //         <section className="form-section">
// //           <h2>Lifestyle Habits</h2>
// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Social Activity Frequency</label>
// //               <select name="SocialActivity" value={formData.SocialActivity} onChange={handleChange} required>
// //                 <option value="never">Never</option>
// //                 <option value="often">Often</option>
// //                 <option value="sometimes">Sometimes</option>
// //               </select>
// //             </div>
// //             <div className="form-group">
// //               <label>Air Travel Frequency</label>
// //               <select name="FrequencyOfTravelingByAir" value={formData.FrequencyOfTravelingByAir} onChange={handleChange} required>
// //                 <option value="frequently">Frequently</option>
// //                 <option value="never">Never</option>
// //                 <option value="rarely">Rarely</option>
// //                 <option value="very frequently">Very Frequently</option>
// //               </select>
// //             </div>
// //           </div>

// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Energy Efficient Practices</label>
// //               <select name="EnergyEfficiency" value={formData.EnergyEfficiency} onChange={handleChange} required>
// //                 <option value="No">No</option>
// //                 <option value="Sometimes">Sometimes</option>
// //                 <option value="Yes">Yes</option>
// //               </select>
// //             </div>
// //             <div className="form-group">
// //               <label>Weekly Waste Bags</label>
// //               <input
// //                 type="number"
// //                 name="WasteBagWeeklyCount"
// //                 min="0"
// //                 max="20"
// //                 value={formData.WasteBagWeeklyCount}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //           </div>
// //         </section>

// //         {/* Consumption Patterns */}
// //         <section className="form-section">
// //           <h2>Consumption Patterns</h2>
// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Monthly Grocery Bill ($)</label>
// //               <input
// //                 type="number"
// //                 name="MonthlyGroceryBill"
// //                 min="0"
// //                 max="10000"
// //                 value={formData.MonthlyGroceryBill}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label>Monthly Vehicle Distance (km)</label>
// //               <input
// //                 type="number"
// //                 name="VehicleMonthlyDistanceKm"
// //                 min="0"
// //                 max="20000"
// //                 value={formData.VehicleMonthlyDistanceKm}
// //                 onChange={handleChange}
// //               />
// //             </div>
// //           </div>

// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Daily Screen Time (TV/PC)</label>
// //               <input
// //                 type="number"
// //                 name="HowLongTVPCDailyHour"
// //                 min="0"
// //                 max="24"
// //                 value={formData.HowLongTVPCDailyHour}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label>Daily Internet Use (hours)</label>
// //               <input
// //                 type="number"
// //                 name="HowLongInternetDailyHour"
// //                 min="0"
// //                 max="24"
// //                 value={formData.HowLongInternetDailyHour}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //           </div>

// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>New Clothing Items/Month</label>
// //               <input
// //                 type="number"
// //                 name="HowManyNewClothesMonthly"
// //                 min="0"
// //                 max="100"
// //                 value={formData.HowManyNewClothesMonthly}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //           </div>
// //         </section>

// //         {/* Sustainability Practices */}
// //         <section className="form-section">
// //           <h2>Sustainability Practices</h2>
// //           <div className="form-row checkbox-group">
// //             <label>Recycled Materials</label>
// //             {['Glass', 'Metal', 'Paper', 'Plastic'].map((material) => (
// //               <label key={material}>
// //                 <input
// //                   type="checkbox"
// //                   value={material}
// //                   checked={formData.recycledMaterials.includes(material)}
// //                   onChange={(e) => handleCheckboxChange(e, 'recycledMaterials')}
// //                 />
// //                 {material}
// //               </label>
// //             ))}
// //           </div>
// //           <div className="form-row checkbox-group">
// //             <label>Cooking Appliances Used</label>
// //             {['Airfryer', 'Grill', 'Microwave', 'Oven', 'Stove'].map((appliance) => (
// //               <label key={appliance}>
// //                 <input
// //                   type="checkbox"
// //                   value={appliance}
// //                   checked={formData.cookingAppliances.includes(appliance)}
// //                   onChange={(e) => handleCheckboxChange(e, 'cookingAppliances')}
// //                 />
// //                 {appliance}
// //               </label>
// //             ))}
// //           </div>
// //         </section>

// //         <div className="form-actions">
// //           <button type="submit" id="calculateBtn">Calculate My Carbon Footprint</button>
// //         </div>
// //       </form>

// //       {loading && (
// //         <div id="loading">
// //           <div className="spinner"></div>
// //           <p>Calculating your carbon footprint...</p>
// //         </div>
// //       )}

// //       {error && (
// //         <div id="error">
// //           <div className="error-icon">❌</div>
// //           <h3>Oops! Something went wrong</h3>
// //           <p>{error}</p>
// //           <button className="btn-outline" onClick={() => setError('')}>Dismiss</button>
// //         </div>
// //       )}

// //       {showResults && (
// //         <div id="results">
// //           <div className="results-header">
// //             <h2>Your Carbon Footprint Results</h2>
// //             <button className="btn-outline" onClick={() => setShowResults(false)}>
// //               <i className="fas fa-arrow-left"></i> Back to Form
// //             </button>
// //           </div>

// //           <div className="result-card">
// //             <div className="result-value">
// //               <span id="footprintValue">{result.value}</span>
// //               <span className="unit">kg CO₂/year</span>
// //             </div>
// //             <div className="result-category">
// //               <span id="footprintCategory" className={`badge ${result.category.toLowerCase()}`}>{result.category}</span>
// //             </div>
// //           </div>

// //           <div className="result-classification">
// //             <h3>Footprint Classification</h3>
// //             <ul>
// //               <li className="classification-item low">🌱 <strong>Low (&lt; 1,000 kg):</strong> Below average environmental impact</li>
// //               <li className="classification-item average">🌍 <strong>Average (1,000-3,000 kg):</strong> Typical urban dweller</li>
// //               <li className="classification-item high">🔥 <strong>High (&gt; 3,000 kg):</strong> Above average impact - consider reduction strategies</li>
// //             </ul>
// //           </div>

// //           <div className="tips-section">
// //             <h3>💡 Tips to Reduce Carbon Footprint</h3>
// //             <ul>
// //               {result.tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
// //             </ul>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CarbonCalculator;



// import { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Loader2 } from 'lucide-react';

// export default function CalculatorPage() {
//   const [carbonFootprint, setCarbonFootprint] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCarbonFootprint = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/calculate-carbon-footprint');
//         const data = await response.json();
//         setCarbonFootprint(data.carbon_footprint); // assuming backend sends { carbon_footprint: value }
//       } catch (error) {
//         console.error('Error fetching carbon footprint:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCarbonFootprint();
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
//       <Card className="max-w-md w-full shadow-xl border-2 border-earthwise-green">
//         <CardHeader>
//           <CardTitle>Carbon Footprint</CardTitle>
//         </CardHeader>
//         <CardContent className="text-center text-lg font-medium">
//           {loading ? (
//             <div className="flex items-center justify-center space-x-2">
//               <Loader2 className="animate-spin h-5 w-5 text-earthwise-green" />
//               <span>Calculating...</span>
//             </div>
//           ) : (
//             <p>
//               Your carbon footprint is <span className="font-bold text-earthwise-green">{carbonFootprint} kg CO₂</span>
//             </p>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
