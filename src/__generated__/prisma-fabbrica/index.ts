import type { Task } from "@prisma/client";
import type { Prisma, PrismaClient } from "@prisma/client";
import { createInitializer, createScreener, getScalarFieldValueGenerator, normalizeResolver, normalizeList, getSequenceCounter, } from "@quramy/prisma-fabbrica/lib/internal";
import type { ModelWithFields, Resolver, } from "@quramy/prisma-fabbrica/lib/internal";
export { resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";

type BuildDataOptions = {
    readonly seq: number;
};

const initializer = createInitializer();

const { getClient } = initializer;

export const { initialize } = initializer;

const modelFieldDefinitions: ModelWithFields[] = [{
        name: "Task",
        fields: []
    }];

type TaskScalarOrEnumFields = {
    id: string;
    content: string;
};

type TaskFactoryDefineInput = {
    id?: string;
    content?: string;
    description?: string | null;
    isCompleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

type TaskFactoryDefineOptions = {
    defaultData?: Resolver<TaskFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<TaskFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

type TaskTraitKeys<TOptions extends TaskFactoryDefineOptions> = keyof TOptions["traits"];

export interface TaskFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Task";
    build(inputData?: Partial<Prisma.TaskCreateInput>): PromiseLike<Prisma.TaskCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TaskCreateInput>): PromiseLike<Prisma.TaskCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.TaskCreateInput>[]): PromiseLike<Prisma.TaskCreateInput[]>;
    pickForConnect(inputData: Task): Pick<Task, "id">;
    create(inputData?: Partial<Prisma.TaskCreateInput>): PromiseLike<Task>;
    createList(inputData: number | readonly Partial<Prisma.TaskCreateInput>[]): PromiseLike<Task[]>;
    createForConnect(inputData?: Partial<Prisma.TaskCreateInput>): PromiseLike<Pick<Task, "id">>;
}

export interface TaskFactoryInterface<TOptions extends TaskFactoryDefineOptions = TaskFactoryDefineOptions> extends TaskFactoryInterfaceWithoutTraits {
    use(name: TaskTraitKeys<TOptions>, ...names: readonly TaskTraitKeys<TOptions>[]): TaskFactoryInterfaceWithoutTraits;
}

function autoGenerateTaskScalarsOrEnums({ seq }: {
    readonly seq: number;
}): TaskScalarOrEnumFields {
    return {
        id: getScalarFieldValueGenerator().String({ modelName: "Task", fieldName: "id", isId: true, isUnique: false, seq }),
        content: getScalarFieldValueGenerator().String({ modelName: "Task", fieldName: "content", isId: false, isUnique: false, seq })
    };
}

function defineTaskFactoryInternal<TOptions extends TaskFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): TaskFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly TaskTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Task", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.TaskCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateTaskScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<TaskFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<TaskFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data: Prisma.TaskCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.TaskCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Task) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.TaskCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().task.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.TaskCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.TaskCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Task" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: TaskTraitKeys<TOptions>, ...names: readonly TaskTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Task} model.
 *
 * @param options
 * @returns factory {@link TaskFactoryInterface}
 */
export function defineTaskFactory<TOptions extends TaskFactoryDefineOptions>(options?: TOptions): TaskFactoryInterface<TOptions> {
    return defineTaskFactoryInternal(options ?? {});
}
