"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useContext, useEffect, useState } from "react"
import { Plus, Trash2, LayoutGrid } from "lucide-react"
import InputField from "@/utilities/InputField"
import { globalContext } from "@/contextApi/ContextApi"
import { createGetAdmissionService } from "@/constans"
import { PostActionAdmin } from "@/actions/admins/PostAction"
import { getAllSubAdmins } from "@/handlers/subAdmins"
 
import SelectField from "@/utilities/SelectField"

export default function AdmissionAdd() {
  const { showToast } = useContext(globalContext);
  const [loading, setLoading] = useState(false); 
  const [institutes, setInstitutes] = useState([]);
  const [formData, setFormData] = useState({
    institute: "",
    serviceName: "",
    deadline: "",
    serviceCharge: 0,
    formFields: []
  })
 
  useEffect(() => {
    const getData = async () => {
      const { status, data } = await getAllSubAdmins();
      if (status === 200) {
        const formatedData = data.map((ins) => ({
          label: ins.username,
          value: ins._id
        }));
        setInstitutes(formatedData);
      }
    };
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const addFormField = () => {
    const newField = {
      id: Date.now().toString(),
      label: "",
      type: "text",
      placeholder: "",
      required: true
    };
    setFormData(prev => ({
      ...prev,
      formFields: [...prev.formFields, newField]
    }));
  }

  const handleFieldChange = (id, fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      formFields: prev.formFields.map(field =>
        field.id === id ? { ...field, [fieldName]: value } : field
      )
    }));
  }

  const removeField = (id) => {
    setFormData(prev => ({
      ...prev,
      formFields: prev.formFields.filter(field => field.id !== id)
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const payload = {
        method: "POST",
        endpoint: createGetAdmissionService,
        body: formData
      };

      const { status, data } = await PostActionAdmin(payload);
      showToast(status, data)

    } catch (error) {
      console.log(error?.message || error)
      showToast(500, error?.message || error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <Dialog className={"my-5"}>
      <DialogTrigger asChild>
        <Button className={"bg-blue-500 hover:bg-blue-600 cursor-pointer"}>Add Admission Services</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-blue-500" />
              Add New Admission Service
            </DialogTitle>
            <DialogDescription>
              সার্ভিসের নাম এবং প্রয়োজনীয় কাস্টম ফর্ম ফিল্ডগুলো নিচে যুক্ত করুন।
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-6">

            <SelectField
              label="প্রতিষ্ঠান"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              required
              options={institutes}
            />
            {/* মেইন সার্ভিস ডিটেইলস */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <Label className="block mb-4 text-blue-700 font-bold uppercase tracking-wider text-xs">Basic Information</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField
                  label="Service Name"
                  name="serviceName"
                  placeholder="e.g. HSC Admission"
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Deadline"
                  name="deadline"
                  type="date"
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Charge (Tk)"
                  name="serviceCharge"
                  type="number"
                  placeholder="0.00"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* ডায়নামিক ফর্ম ফিল্ডস সেকশন */}
            <div className="space-y-4">
              <Label className="text-lg font-bold flex items-center gap-2">
                Custom Form Fields
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                  {formData.formFields.length}
                </span>
              </Label>

              {/* কাস্টম ফিল্ড লিস্ট */}
              {formData.formFields.map((field, index) => (
                <div key={field.id} className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm relative group animate-in fade-in zoom-in duration-300">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    onClick={() => removeField(field.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label={`Label ${index + 1}`}
                      placeholder="e.g. SSC Roll"
                      value={field.label}
                      onChange={(e) => handleFieldChange(field.id, "label", e.target.value)}
                    />

                    <InputField
                      label="Placeholder"
                      placeholder="e.g. Enter your roll"
                      value={field.placeholder}
                      onChange={(e) => handleFieldChange(field.id, "placeholder", e.target.value)}
                    />

                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Field Type</Label>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={field.type}
                        onChange={(e) => handleFieldChange(field.id, "type", e.target.value)}
                      >
                        <option value="text">Text (লেখা)</option>
                        <option value="number">Number (সংখ্যা)</option>
                        <option value="email">Email</option>
                        <option value="date">Date</option>
                        <option value="file">File/Image</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 pt-8">
                      <input
                        type="checkbox"
                        id={`req-${field.id}`}
                        checked={field.required}
                        onChange={(e) => handleFieldChange(field.id, "required", e.target.checked)}
                        className="w-5 h-5 accent-blue-600 cursor-pointer rounded"
                      />
                      <Label htmlFor={`req-${field.id}`} className="cursor-pointer text-sm font-medium text-slate-600">
                        Is Required?
                      </Label>
                    </div>
                  </div>
                </div>
              ))}

              {/* লিস্টের শেষে বাটন - এখন ইউজারকে আর উপরে স্ক্রল করতে হবে না */}
              <Button
                type="button"
                variant="dashed"
                onClick={addFormField}
                className="w-full py-8 border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-all flex flex-col gap-2 rounded-xl"
              >
                <Plus className="w-6 h-6" />
                <span className="font-bold uppercase tracking-tight text-xs">Add New Custom Field</span>
              </Button>
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 bg-white pt-4 border-t">
            <DialogClose asChild>
              <Button variant="ghost" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading} className={`${loading && "animate-bounce"} bg-blue-600 hover:bg-blue-700 px-8 shadow-lg shadow-blue-200`}>
              {
                loading ? "Saving..." : "Save Admission"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}