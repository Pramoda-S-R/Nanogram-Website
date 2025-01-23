import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Switch from "../../components/ui/Switch";
import TextArea from "../../components/ui/TextArea";
import DatetimePicker from "../../components/ui/DatetimePicker";
import GenericFileUploader from "../../components/shared/GenericFileUploader";
import { CalendarDays, Pin, Text } from "lucide-react";
import { formatReadableTime } from "../../lib/utils";
import { eventFormSchema } from "../../lib/validation";
import {
  useCreateEvent,
  useDeleteEvent,
  useGetEvents,
  useUpdateEvent,
} from "../../lib/react_query/queriesAndMutations";
import { useToast } from "../../components/ui/Toast";
import EventCard from "../../components/shared/EventCard";

function EventsForm({ event, action, eventSubmit }) {
  const toast = useToast();
  const { mutateAsync: createEvent, isPending: isCreating } = useCreateEvent();
  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent();
  // Form State
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: event ? event?.title : "",
      subtitle: event ? event?.subtitle : "",
      description: event ? event?.description : "",
      content: event ? event?.content : "",
      completed: event ? event?.completed : false,
      registration: event ? event?.registration : "",
      date: event ? event?.date : null,
      location: event ? event?.location : "",
      image: [],
    },
  });

  const isCompleted = watch("completed");
  const dateValue = watch("date");

  const onSubmit = async (data) => {
    console.log(data);
    if (event && action === "Update") {
      const updatedEvent = await updateEvent({
        ...data,
        id: event?.$id,
        imageId: event?.imageId,
        imageUrl: event?.imageUrl,
      });
      if (!updatedEvent) {
        toast({
          title: "Update Failed!",
          description: "There was an error in updating. Please try again.",
        });
      } else {
        toast({
          title: "Update Successful!",
          description: "Your member has been updated successfully. 🎉",
        });
      }
      return eventSubmit(true);
    }
    const newEvent = await createEvent(data);
    if (!newEvent) {
      toast({
        title: "Upload Failed!",
        description: "There was an error in Uploading. Please try again.",
      });
    } else {
      toast({
        title: "Upload Successful!",
        description: "Your member has been uploaded successfully. 🎉",
      });
      eventSubmit(true);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-[75vh] flex flex-col gap-4 w-full px-3 pb-10 overflow-y-scroll custom-scrollbar"
    >
      {/* Add Title */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">Title</label>
        <Input
          type="text"
          id="title"
          placeholder="Title of the Event"
          autoComplete="off"
          icon={<Text />}
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      {/* Add Subtitle */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">
          Subtitle
        </label>
        <Input
          type="text"
          id="subtitle"
          placeholder="What kind of Event"
          autoComplete="off"
          icon={<Text />}
          {...register("subtitle")}
        />
        {errors.subtitle && (
          <p className="text-red-600 text-sm mt-1">{errors.subtitle.message}</p>
        )}
      </div>
      {/* Add Description */}
      <div className="px-3">
        <label className="block text-neutral-black font-semibold">
          Description
        </label>
        <TextArea
          placeholder="Describe the Event"
          rows={2}
          className="mt-2 custom-scrollbar"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      {/* Add Content */}
      <div className="px-3">
        <label className="block text-neutral-black font-semibold">
          Content
        </label>
        <TextArea
          placeholder="Explain the Event"
          rows={4}
          className="mt-2 custom-scrollbar"
          {...register("content")}
        />
        {errors.content && (
          <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>
      {/* Add Completed */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">
          Completed
        </label>
        <Switch
          id="completed"
          name="completed"
          checked={isCompleted}
          onChange={(e) => setValue("completed", e.target.checked)}
          // label="Is the event completed?"
        />
        {errors.completed && (
          <p className="text-red-600 text-sm mt-1">
            {errors.completed.message}
          </p>
        )}
      </div>
      {/* Add Registration */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">
          Registration Link
        </label>
        <Input
          type="text"
          id="registration"
          placeholder="Registration Link"
          autoComplete="off"
          icon={<Text />}
          {...register("registration")}
        />
        {errors.registration && (
          <p className="text-red-600 text-sm mt-1">
            {errors.registration.message}
          </p>
        )}
      </div>
      {/* Add Date */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">Date</label>
        <DatetimePicker
          value={dateValue ? new Date(dateValue) : ""}
          onChange={(date) => {
            if (date && date.toDate) {
              setValue("date", date.toDate().toISOString());
            }
          }}
          placeholder={"Event Date"}
        />
      </div>
      {/* Add Location */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">
          Location
        </label>
        <Input
          type="text"
          id="location"
          placeholder="Location of the Event"
          autoComplete="off"
          icon={<Pin />}
          {...register("location")}
        />
      </div>
      {/* Add Image */}
      <div className="px-3">
        <label className="block text-neutral-black font-semibold">Image</label>
        <GenericFileUploader
          onFileChange={(file) => setValue("image", file)}
          initialFileUrl={event?.imageUrl}
          acceptedFileTypes={{ "image/*": [".jpg", ".jpeg", ".png"] }}
          enableImageCropping={true}
          cropAspectRatio={16 / 9}
          cropperStyle={{ height: 400, width: "100%" }}
        />
        {errors.file && (
          <p className="text-red-600 text-sm mt-1">{errors.file.message}</p>
        )}
      </div>
      {/* Submit Button */}
      <div className="flex gap-4 items-center justify-end mb-14 md:mb-0">
        <Button type="submit" disabled={isCreating || isUpdating}>
          {isCreating || (isUpdating && "Validating...  ")} {action}
        </Button>
      </div>
    </form>
  );
}

function FormDialog({ action, event }) {
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
        <EventsForm
          action={action}
          event={event}
          eventSubmit={(e) => setIsDialogOpen(!e)}
        />
      </DialogContent>
    </Dialog>
  );
}

function DisplayEvent({ event }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const date = new Date(event.date);
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
          <DialogTitle>Preview of {event.title}</DialogTitle>
          <DialogDescription>
            Cross check the details of the event {event.title}
          </DialogDescription>
        </DialogHeader>
        <div className="h-[75vh] flex flex-col gap-4 w-full px-3 pb-10 overflow-y-scroll overflow-x-hidden custom-scrollbar">
          <img
            src={event.imageUrl || "/assets/images/placeholder.png"}
            alt={event.title || "Event"}
          />
          <p>{event.content}</p>
          <p className="flex gap-2">
            <CalendarDays />
            {date &&
              `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
          </p>
          <p className="flex gap-2">
            <Pin />
            {event.location}
          </p>
          <hr className="w-full" />
          <EventCard
            date={date.toDateString()}
            title={event.title}
            description={event.description}
          />
          <hr className="w-full" />
          <div className="relative">
            <div className="overflow-hidden aspect-w-3 aspect-h-4 flex justify-center items-center">
              <div className="object-cover w-full h-full transition-all duration-300 origin-bottom hover:scale-110 aspect-[3/4]">
                <img
                  alt={event.title}
                  className="object-cover w-full h-full transition-all duration-300 origin-bottom hover:scale-110 aspect-[3/4]"
                  src={event.imageUrl}
                  loading="lazy"
                />
              </div>
              <div className="absolute z-20 flex flex-col justify-center items-center">
                <h3 className="text-base font-bold text-neutral-white">
                  {event.title}
                </h3>
                <p className="text-sm font-medium text-neutral-white/75">
                  {event.subtitle}
                </p>
              </div>
              <div className="absolute z-10 inset-0 bg-black/20 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const ControlEvents = () => {
  const navigate = useNavigate();
  const { data: events } = useGetEvents();
  const { mutateAsync: deleteEvent, isPending } = useDeleteEvent();

  return (
    <div className="default-container">
      <h2 className="w-full flex-center text-2xl font-extrabold pt-5">
        Control Events
      </h2>
      <div className="w-full flex-center py-10">
        <FormDialog action={"Create"} />
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1">Index</th>
              <th className="border px-2 py-1">Read</th>
              <th className="border px-2 py-1">Update</th>
              <th className="border px-2 py-1">Delete</th>
              <th className="border px-2 py-1">Document Id</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">Subtitle</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Content</th>
              <th className="border px-2 py-1">Location</th>
              <th className="border px-2 py-1">Registration</th>
              <th className="border px-2 py-1">Image</th>
              <th className="border px-2 py-1">Image Id</th>
              <th className="border px-2 py-1">Created Time</th>
              <th className="border px-2 py-1">Updated Time</th>
            </tr>
          </thead>
          <tbody>
            {events.documents?.map((event, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">
                  <DisplayEvent event={event} />
                </td>
                <td className="border px-2 py-1">
                  {<FormDialog action={"Update"} event={event} />}
                </td>
                <td className="border px-2 py-1">
                  <Button
                    variant="destructive"
                    onClick={() =>
                      deleteEvent({
                        eventId: event.$id,
                        imageId: event.imageId,
                      })
                    }
                    disabled={isPending}
                  >
                    Delete
                  </Button>
                </td>
                <td className="border px-2 py-1">{event.$id}</td>
                <td className="border px-2 py-1">
                  {formatReadableTime(event.date)}
                </td>
                <td className="border px-2 py-1">{event.title}</td>
                <td className="border px-2 py-1">{event.subtitle}</td>
                <td className="border px-2 py-1">{event.description}</td>
                <td className="border px-2 py-1">
                  {event.content?.slice(0, 20)}
                  {event.content?.length > 20 && "..."}
                </td>
                <td className="border px-2 py-1">{event.location}</td>
                <td className="border px-2 py-1">
                  {event.registration && (
                    <Button onClick={() => window.open(event.registration, "_blank")}>
                      Register
                    </Button>
                  )}
                </td>
                <td className="border px-2 py-1">
                  <img
                    src={event.imageUrl || "/assets/images/placeholder"}
                    alt={event.title || "Event Image"}
                  />
                </td>
                <td className="border px-2 py-1">{event.imageId}</td>
                <td className="border px-2 py-1">
                  {formatReadableTime(event.$createdAt)}
                </td>
                <td className="border px-2 py-1">
                  {formatReadableTime(event.$updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ControlEvents;
