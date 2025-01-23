import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Switch from "../../components/ui/Switch";
import TextArea from "../../components/ui/TextArea";
import GenericFileUploader from "../../components/shared/GenericFileUploader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";
import { useToast } from "../../components/ui/Toast";
import {
  ArrowDown01,
  Award,
  Check,
  Github,
  Instagram,
  Linkedin,
  Type,
  X,
} from "lucide-react";
import { formatReadableTime } from "../../lib/utils";
import { nanogramFormSchema } from "../../lib/validation";
import {
  useCreateNanogram,
  useDeleteNanogram,
  useGetNanogram,
  useUpdateNanogram,
} from "../../lib/react_query/queriesAndMutations";

function AboutUsForm({ action, member, memberSubmit }) {
  const toast = useToast();
  const { mutateAsync: createMember, isPending: isCreating } =
    useCreateNanogram();
  const { mutateAsync: updateMember, isPending: isUpdating } =
    useUpdateNanogram();

  // Form State
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(nanogramFormSchema),
    defaultValues: {
      name: member ? member?.name : "",
      role: member ? member?.role : "",
      content: member ? member?.content : "",
      file: [],
      linkedin: member ? member?.linkedin : "",
      instagram: member ? member?.instagram : "",
      github: member ? member?.github : "",
      alumini: member ? member?.alumini : false,
      core: member ? member?.core : false,
      priority: member ? member?.priority : NaN,
    },
  });

  const isAlumini = watch("alumini");
  const isCore = watch("core");

  const onSubmit = async (data) => {
    console.log(data);
    if (member && action === "Update") {
      const updatedMember = await updateMember({
        ...data,
        id: member?.$id,
        avatarId: member?.avatarId,
        avatarUrl: member?.avatarUrl,
      });

      if (!updatedMember) {
        toast({
          title: "Update Failed!",
          description: "There was an error in updating. Please try again.",
        });
      }
      toast({
        title: "Update Successful!",
        description: "Your member has been updated successfully. 🎉",
      });
      return memberSubmit(true);
    }
    const newMember = await createMember(data);
    if (!newMember) {
      toast({
        title: "Upload Failed!",
        description: "There was an error in Uploading. Please try again.",
      });
    } else {
      toast({
        title: "Upload Successful!",
        description: "Your member has been uploaded successfully. 🎉",
      });
      memberSubmit(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full h-[75vh] px-3 pb-10 overflow-y-scroll custom-scrollbar"
    >
      {/* Add Name */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">Name</label>
        <Input
          type="text"
          id="name"
          placeholder="Name of the member"
          icon={<Type />}
          autoComplete="off"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      {/* Add Role */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">Role</label>
        <Input
          type="text"
          id="role"
          placeholder="Role of the member"
          icon={<Award />}
          autoComplete="off"
          {...register("role")}
        />
        {errors.role && (
          <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>
      {/* Add Content */}
      <div className="px-3">
        <label className="block text-neutral-black font-semibold">
          Content
        </label>
        <TextArea
          placeholder="Write a member..."
          rows={4}
          className="mt-2 custom-scrollbar"
          {...register("content")}
        />
      </div>
      {/* Add Avatar */}
      <div className="px-3">
        <label className="block text-neutral-black font-semibold">Avatar</label>
        <GenericFileUploader
          onFileChange={(file) => setValue("file", file)}
          initialFileUrl={member?.avatarUrl}
          acceptedFileTypes={{ "image/*": [".jpg", ".jpeg", ".png"] }}
          enableImageCropping={true}
          cropAspectRatio={0.8}
          cropperStyle={{ height: 400, width: "100%" }}
        />
        {errors.file && (
          <p className="text-red-600 text-sm mt-1">{errors.file.message}</p>
        )}
      </div>
      {/* Add LinkedIn */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">
          LinkedIn
        </label>
        <Input
          type="text"
          id="linkedin"
          placeholder="LinkedIn of the member"
          autoComplete="off"
          icon={<Linkedin />}
          {...register("linkedin")}
        />
        {errors.linkedin && (
          <p className="text-red-600 text-sm mt-1">{errors.linkedin.message}</p>
        )}
      </div>
      {/* Add Instagram */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">
          Instagram
        </label>
        <Input
          type="text"
          id="instagram"
          placeholder="Instagram of the member"
          autoComplete="off"
          icon={<Instagram />}
          {...register("instagram")}
        />
        {errors.instagram && (
          <p className="text-red-600 text-sm mt-1">
            {errors.instagram.message}
          </p>
        )}
      </div>
      {/* Add Github */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">Github</label>
        <Input
          type="text"
          id="github"
          placeholder="Github of the member"
          autoComplete="off"
          icon={<Github />}
          {...register("github")}
        />
        {errors.github && (
          <p className="text-red-600 text-sm mt-1">{errors.github.message}</p>
        )}
      </div>
      {/* Add Alumini */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">
          Alumini
        </label>
        <Switch
          id="alumini"
          name="alumini"
          checked={isAlumini}
          onChange={(e) => setValue("alumini", e.target.checked)}
          // label="Is the member an alumini?"
        />
        {errors.alumini && (
          <p className="text-red-600 text-sm mt-1">{errors.alumini.message}</p>
        )}
      </div>
      {/* Add Core */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">Core</label>
        <Switch
          id="alumini"
          name="alumini"
          checked={isCore}
          onChange={(e) => setValue("core", e.target.checked)}
          // label="Is the member a core?"
        />
        {errors.core && (
          <p className="text-red-600 text-sm mt-1">{errors.core.message}</p>
        )}
      </div>
      {/* Add Priority */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">
          Priority
        </label>
        <Input
          type="number"
          id="priority"
          placeholder="Priority of the member"
          autoComplete="off"
          icon={<ArrowDown01 />}
          {...register("priority", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
        />
        {errors.priority && (
          <p className="text-red-600 text-sm mt-1">{errors.priority.message}</p>
        )}
      </div>
      {/* Submit Button */}
      <div className="flex gap-4 items-center justify-end mb-14 md:mb-0">
        <Button type="submit" disabled={false}>
          {/*isCreating || (isUpdating && "Validating...  ")*/} {action}
        </Button>
      </div>
    </form>
  );
}

function NanogramDisplay({ member }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <div
          className="px-4 py-2 rounded-md font-semibold text-sm flex gap-3 items-center justify-center text-center border-2 border-neutral-black text-neutral-black bg-neutral-white hover:bg-neutral-white/70"
          onClick={() => setIsDialogOpen(true)}
        >
          View
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preview of {member.name}</DialogTitle>
          <DialogDescription>
            Here's how {member.name} will look in the website.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[75vh] overflow-y-scroll custom-scrollbar">
          <div className="flex-center flex-col gap-6 xl:flex-row py-2">
            <div className="w-40 h-50 aspect-[4/5] flex-none rounded-2xl object-cover">
              <img
                alt={member.name}
                loading="lazy"
                className="w-40 h-50 aspect-[4/5] flex-none rounded-2xl object-cover"
                src={member.avatarUrl}
              />
            </div>
            <div className="flex-auto">
              <h3 className="text-lg font-semibold leading-8 tracking-tight text-neutral-black">
                {member.name}
              </h3>
              <p className="text-base leading-7 text-neutral-black/70">
                {member.role}
              </p>

              {/* Social Links */}
              <div className="mt-6 flex space-x-4">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-black hover:text-primary"
                  >
                    <Linkedin />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-black hover:text-primary"
                  >
                    <Instagram />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-black hover:text-primary"
                  >
                    <Github />
                  </a>
                )}
              </div>
            </div>
          </div>
          {member.content && (
            <>
              <hr className="w-full py-2" />
              <div className="flex flex-col items-center text-center">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-24 h-24 rounded-full border border-neutral-black/10 object-cover mx-auto"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-neutral-black/70 mb-4">{member.role}</p>
                <blockquote className="text-lg italic text-neutral-black">
                  "{member.content}"
                </blockquote>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FormDialog({ member, action }) {
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  useEffect(() => {
    setIsDialogOpen(false);
  }, [location]);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <div
          className="rounded-md font-semibold text-sm flex gap-3 items-center justify-center text-center bg-primary text-neutral-white hover:bg-primary/85 px-4 py-2"
          onClick={() => setIsDialogOpen(true)}
        >
          {action}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>About Us</DialogTitle>
          <DialogDescription>Form to upload Nanogram</DialogDescription>
        </DialogHeader>
        <hr className="w-full" />
        <AboutUsForm
          action={action}
          member={member}
          memberSubmit={(e) => setIsDialogOpen(!e)}
        />
      </DialogContent>
    </Dialog>
  );
}

const ControlAboutUs = () => {
  const { data: nanogram } = useGetNanogram();

  const { mutateAsync: deleteNanogram, isPending } = useDeleteNanogram();

  return (
    <div className="default-container">
      <h2 className="w-full flex-center text-2xl font-extrabold pt-5">
        Control About Us
      </h2>
      <div className="w-full flex-center py-10">
        <FormDialog action={"Create"} />
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="border px-2 py-1">Index</th>
              <th className="border px-2 py-1">Read</th>
              <th className="border px-2 py-1">Update</th>
              <th className="border px-2 py-1">Delete</th>
              <th className="border px-2 py-1">Document-Id</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Role</th>
              <th className="border px-2 py-1">Content</th>
              <th className="border px-2 py-1">Avatar</th>
              <th className="border px-2 py-1">Avatar-Id</th>
              <th className="border px-2 py-1">LinkedIn</th>
              <th className="border px-2 py-1">Instagram</th>
              <th className="border px-2 py-1">Github</th>
              <th className="border px-2 py-1">Alumini</th>
              <th className="border px-2 py-1">Core</th>
              <th className="border px-2 py-1">Priority</th>
              <th className="border px-2 py-1">Created-At</th>
              <th className="border px-2 py-1">Updated-At</th>
            </tr>
          </thead>
          <tbody>
            {nanogram.documents?.map((entry, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">
                  {<NanogramDisplay member={entry} />}
                </td>
                <td className="border px-2 py-1">
                  {<FormDialog action={"Update"} member={entry} />}
                </td>
                <td className="border px-2 py-1">
                  <Button
                    variant="destructive"
                    onClick={() =>
                      deleteNanogram({
                        nanogramId: entry.$id,
                        avatarId: entry.avatarId,
                      })
                    }
                    disabled={isPending}
                  >
                    Delete
                  </Button>
                </td>
                <td className="border px-2 py-1">{entry.$id}</td>
                <td className="border px-2 py-1">{entry.name}</td>
                <td className="border px-2 py-1">{entry.role}</td>
                <td className="border px-2 py-1">
                  {entry.content?.slice(0, 20)}
                  {entry.content?.length > 20 && "..."}
                </td>
                <td className="border px-2 py-1">
                  <img
                    src={entry.avatarUrl || "/assets/images/placeholder"}
                    alt={entry.name || "avatar"}
                  />
                </td>
                <td className="border px-2 py-1">{entry.avatarId}</td>
                <td className="border px-2 py-1">
                  {entry.linkedin && (
                    <Link to={entry.linkedin} className="flex justify-center">
                      <Linkedin />
                    </Link>
                  )}
                </td>
                <td className="border px-2 py-1">
                  {entry.instagram && (
                    <Link to={entry.instagram} className="flex justify-center">
                      <Instagram />
                    </Link>
                  )}
                </td>
                <td className="border px-2 py-1">
                  {entry.github && (
                    <Link to={entry.github} className="flex justify-center">
                      <Github />
                    </Link>
                  )}
                </td>
                <td className="border px-2 py-1">
                  {entry.alumini ? <Check /> : <X />}
                </td>
                <td className="border px-2 py-1">
                  {entry.core ? <Check /> : <X />}
                </td>
                <td className="border px-2 py-1">{entry.priority}</td>
                <td className="border px-2 py-1">
                  {formatReadableTime(entry.$createdAt)}
                </td>
                <td className="border px-2 py-1">
                  {formatReadableTime(entry.$updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ControlAboutUs;
